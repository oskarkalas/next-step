import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import {StoreModule} from "@ngrx/store";
import {RouterModule} from '@angular/router';
import {HttpHeaders, provideHttpClient} from "@angular/common/http";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {loadDevMessages, loadErrorMessages} from "@apollo/client/dev";
import {APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
import {ApolloLink, InMemoryCache} from "@apollo/client/core";
import {HttpLink} from "apollo-angular/http";
import {EffectsModule} from "@ngrx/effects";
import {environment} from "./environments/environment";
import {routerReducer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {appRoutes} from "./app/app.routes";
import {messagesReducer} from "./app/state/reducers/message.reducer";
import {MODULE_KEYS} from "./app/core/enums/module-keys.enum";
import {provideAnimations} from "@angular/platform-browser/animations";

if (isDevMode()) {
  loadDevMessages();
  loadErrorMessages();
}

function createApollo(httpLink: HttpLink) {
  const middleware = new ApolloLink((operation, forward) => {
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
  const http = httpLink.create({ uri: environment.graphqlApiUrl });
  const linkQl = middleware.concat(http);
  return {
    link: linkQl,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    defaultOptions : {
      watchQuery : {
        fetchPolicy : 'cache-first',
        errorPolicy : 'all',
        pollInterval: false
      }
    }
  };
}

export const bootstrapConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    },
    importProvidersFrom(
      RouterModule.forRoot(appRoutes),
      StoreModule.forRoot({
        [MODULE_KEYS.routes]: routerReducer,
        [MODULE_KEYS.massages]: messagesReducer
      }),
      EffectsModule.forRoot([]),
      StoreRouterConnectingModule.forRoot(),
      ApolloModule
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    })]
};
