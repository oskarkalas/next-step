import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import {provideStore} from "@ngrx/store";
import {provideRouter} from '@angular/router';
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {provideClientHydration} from '@angular/platform-browser';
import * as fromState from "./app/state/reducers";
import {FormlyModule} from "@ngx-formly/core";
import {PrimeFieldWrapper} from "./app/components/shared/prime-formly-templates/wrappers/prime-field-wrapper";
import {PrimeInputType} from "./app/components/shared/prime-formly-templates/types/prime-input-type";
import {ModulePathsEnum} from "./app/core/enums/module-paths.enum";
import {HttpLink} from "apollo-angular/http";
import {ApolloLink, InMemoryCache} from "@apollo/client/core";
import {HttpHeaders, provideHttpClient} from "@angular/common/http";
import {APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
import {environment} from "./environments/environment";
import {AuthGuard} from "./app/guards/auth.guard";
import {DashboardComponent} from "./app/components/dashboard/dashboard.component";
import {AuthContainer} from "./app/components/auth/auth.container";
import {GraphqlLoginServices} from "./app/core/graphql/graphql-login.services";
import {provideEffects} from "@ngrx/effects";
import {AuthEffects} from "./app/state/effects/auth.effects";
import {loadDevMessages, loadErrorMessages} from "@apollo/client/dev";
import {provideAnimations} from "@angular/platform-browser/animations";


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
    GraphqlLoginServices,
    provideAnimations(),
    provideStore(fromState.reducers, {
      metaReducers: fromState.metaReducers
    }),
    provideEffects([AuthEffects]),
    importProvidersFrom([FORMLY_SETTINGS, ApolloModule]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideRouter([
    { path: '',
      redirectTo: ModulePathsEnum.LOGIN,
      pathMatch: 'full'
    },
    { path: ModulePathsEnum.DASHBOARD,
      component: DashboardComponent,
      canActivate: [AuthGuard]
    },
    { path: ModulePathsEnum.LOGIN,
      component: AuthContainer}
])]
};
