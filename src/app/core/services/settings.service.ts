import { Injectable } from '@angular/core';
import {ApolloQueryResult, QueryOptions} from "@apollo/client/core";
import { Apollo} from "apollo-angular";
import { Observable } from "rxjs";
import { ME_QUERY } from "../graphql/queries";
import { User } from "../../../generated/gql.types";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private apollo: Apollo) {}

  public queryMe(): Observable<ApolloQueryResult<{Me: User}>> {
    const queryOptions: QueryOptions = {
      query: ME_QUERY,
      errorPolicy: 'all',
      fetchPolicy: "cache-first",
      pollInterval: 0
    };
    return this.apollo.query<{Me: User}>(queryOptions)
  }
}
