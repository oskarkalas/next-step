import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import {StoreModule} from "@ngrx/store";
import {RouterModule} from '@angular/router';
import {HttpHeaders, provideHttpClient} from "@angular/common/http";
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {loadDevMessages, loadErrorMessages} from "@apollo/client/dev";
import {APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
import {ApolloLink, InMemoryCache} from "@apollo/client/core";
import {HttpLink} from "apollo-angular/http";
import {EffectsModule} from "@ngrx/effects";
import {FormlyModule} from "@ngx-formly/core";
import {PrimeFieldWrapper} from "./app/components/shared/prime-formly-templates/wrappers/prime-field-wrapper";
import {PrimeInputType} from "./app/components/shared/prime-formly-templates/types/prime-input-type";
import {environment} from "./environments/environment";
import {AuthEffects} from "./app/state/effects/auth.effects";
import {routerReducer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {appRoutes} from "./app/app.routes";
import {authReducer} from "./app/state/reducers/auth.reducer";


if (isDevMode()) {
  loadDevMessages();
  loadErrorMessages();
}

const FORMLY_SETTINGS = FormlyModule.forRoot({
  validationMessages: [
    { name: 'required', message: 'This field is required' },
  ],
  wrappers: [
    {name: 'panel', component: PrimeFieldWrapper},
  ],
  types: [
    {name: 'input-text', extends: 'input', component: PrimeInputType, wrappers: ['input-text']}
  ]
});


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
        fetchPolicy : 'network-only',
        errorPolicy : 'all'
      }
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    },
    provideAnimations(),
    importProvidersFrom(
      RouterModule.forRoot(appRoutes),
      StoreModule.forRoot({router: routerReducer, authKey: authReducer}),
      EffectsModule.forRoot([AuthEffects]),
      StoreRouterConnectingModule.forRoot(),
      FORMLY_SETTINGS,
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
