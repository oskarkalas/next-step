import { Injectable } from '@angular/core';
import { MutationOptions } from "@apollo/client/core";
import { Apollo, MutationResult} from "apollo-angular";
import { Observable } from "rxjs";
import { REGISTER_MUTATION, SIGN_IN_MUTATION } from "./queries";
import { LoginInput, LoginResponse, UserCreateInput } from "../../../generated/gql.types";

@Injectable({
  providedIn: 'root'
})
export class GraphqlLoginServices {
  constructor(private apollo: Apollo) { }
  public mutationLogin(loginInput: LoginInput): Observable<MutationResult<{
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

  public mutationRegister(registerInput: UserCreateInput): Observable<MutationResult<LoginResponse>> {
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
