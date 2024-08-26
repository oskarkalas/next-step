import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Apollo, MutationResult} from "apollo-angular";
import {Observable} from "rxjs";
import {MutationOptions} from "@apollo/client/core";
import {LoginInput, LoginResponse, UserCreateInput} from "../../generated/gql.types";
import {REGISTER_MUTATION, SIGN_IN_MUTATION} from "../core/graphql/queries";
import {ContainerPathsEnum} from "../core/enums/container-paths.enum";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private router: Router,
    private apollo: Apollo
  ) { }

  public signIn(loginInput: LoginInput)
    : Observable<MutationResult<{login: LoginResponse}>> {
    return this.mutationLogin(loginInput);
  }

  public register(registerInput: LoginInput)
    : Observable<MutationResult<LoginResponse>> {
    return this.mutationRegister(registerInput)
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate([ContainerPathsEnum.AUTH])
  }

  private mutationLogin(loginInput: LoginInput): Observable<MutationResult<{
    login: LoginResponse
  }>> {
    const mutationOptions: MutationOptions = {
      mutation: SIGN_IN_MUTATION,
      variables: {
        email: loginInput.email,
        password: loginInput.password
      },
      errorPolicy: 'ignore',
    };
    return this.apollo.mutate<{ login: LoginResponse }>(mutationOptions)
  }

  private mutationRegister(registerInput: UserCreateInput): Observable<MutationResult<LoginResponse>> {
    const mutationOptions: MutationOptions = {
      mutation: REGISTER_MUTATION,
      variables: {
        email: registerInput.email,
        password: registerInput.password,
      },
      errorPolicy: 'ignore',
    };
    return this.apollo.mutate<LoginResponse>(mutationOptions)
  }
}
