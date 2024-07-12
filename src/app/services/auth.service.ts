import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { MutationResult} from "apollo-angular";
import { Observable, tap } from "rxjs";
import { GraphqlLoginServices } from "../core/graphql/graphql-login.services";
import { FullRoutesPathEnum } from "../core/enums/full-routes-path.enum";
import { LoginInput, LoginResponse } from "../../generated/gql.types";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private activationRoute: ActivatedRoute,
    private queriesService: GraphqlLoginServices,
    private http: HttpClient,
  ) { }

  public signIn(loginInput: LoginInput)
    : Observable<MutationResult<{login: LoginResponse}>> {
    return this.queriesService.mutationLogin(loginInput);
  }

  public register(registerInput: LoginInput)
    : Observable<MutationResult<LoginResponse>> {
    return this.queriesService.mutationRegister(registerInput)
  }

  public addToken(jwtToken: string | null = null): void {
    if(jwtToken !== null) {
      localStorage.setItem('token', jwtToken);
      if(this.activationRoute.snapshot.queryParamMap.has('redirectUrl')) {
        window.location.href = this.activationRoute.snapshot.queryParamMap.get('redirectUrl')!;
      } else {
        this.router.navigate([FullRoutesPathEnum.DASHBOARD]);
      }
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate([FullRoutesPathEnum.SIGN_IN])
  }

  hasAccess(routeState: RouterStateSnapshot, activatedRouteSnapshot: ActivatedRouteSnapshot): boolean {
    const accessToken = activatedRouteSnapshot.queryParamMap.get('accessToken');
    if(accessToken) {
        this.http.get<boolean>('http://localhost:3000/auth/validate-user-token', {params: {accessToken}}).pipe(
          tap(status => status ? this.addToken(accessToken) : null)
        )
    }
    if (!localStorage.getItem('token')) {

      this.router.navigate([FullRoutesPathEnum.SIGN_IN],
        {
          queryParams: {redirectUrl: routeState.url},
          queryParamsHandling: 'merge'
        })
    }
    return !!localStorage.getItem('token');
  }
}
