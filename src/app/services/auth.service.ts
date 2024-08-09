import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { MutationResult} from "apollo-angular";
import { Observable } from "rxjs";
import { GraphqlLoginServices } from "../core/graphql/graphql-login.services";
import { FullRoutesPathEnum } from "../core/enums/full-routes-path.enum";
import { LoginInput, LoginResponse } from "../../generated/gql.types";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private router: Router,
    private queriesService: GraphqlLoginServices,
  ) { }

  public signIn(loginInput: LoginInput)
    : Observable<MutationResult<{login: LoginResponse}>> {
    return this.queriesService.mutationLogin(loginInput);
  }

  public register(registerInput: LoginInput)
    : Observable<MutationResult<LoginResponse>> {
    return this.queriesService.mutationRegister(registerInput)
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate([FullRoutesPathEnum.SIGN_IN])
  }
}
