import { NgModule } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {Apollo, ApolloModule} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {ApolloLink} from "@apollo/client/core";
import {InMemoryCache} from "@apollo/client/core";
import {environment} from "../../../environments/environment";


@NgModule({
  declarations: [],
  imports: [ ApolloModule]
})
export class ApolloGraphqlModule {

  constructor(private apollo: Apollo, private httpLink: HttpLink) {

    /*    const link = onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path }) => {
              // Here you may display a message to indicate graphql error
              // You may use 'sweetalert', 'ngx-toastr' or any of your preference
              console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
            });
          }
          if (networkError) {
            // Here you may display a message to indicate network error
            console.log(`[Network error]:  ${networkError.name}, ${networkError.message}`);
          }
        });*/

    const http = httpLink.create({ uri: environment.graphqlApiUrl });
    const middleware = new ApolloLink((operation, forward) => {

      // Check for token
      const token = localStorage.getItem('token');
      if (!token) { return forward(operation); }

      operation.setContext({
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + token,
        ),
      });
      return forward(operation);
    });

    const linkQl = middleware.concat(http);

    apollo.create(
      {
        link : linkQl,
        cache: new InMemoryCache(),
        connectToDevTools: true,
        defaultOptions : {
          watchQuery : {
            fetchPolicy : 'network-only',
            errorPolicy : 'all'
          }
        }
      },
      'default'
    );
  }
}
