import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import {provideStore} from "@ngrx/store";
import {provideRouter} from '@angular/router';
import {provideStoreDevtools} from "@ngrx/store-devtools";

import {routeConfig} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import * as fromState from "./state/reducers";
import {FormlyModule} from "@ngx-formly/core";
import {PrimeFieldWrapper} from "./components/shared/prime-formly-templates/wrappers/prime-field-wrapper";
import {PrimeInputType} from "./components/shared/prime-formly-templates/types/prime-input-type";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routeConfig),
    provideClientHydration(),
    provideStore(fromState.reducers, {
      metaReducers: fromState.metaReducers
    }),
    importProvidersFrom([
      FormlyModule.forRoot({
        validationMessages: [
          { name: 'required', message: 'This field is required' },
        ],
        wrappers: [
          {name: 'panel', component: PrimeFieldWrapper},
        ],
        types: [
          {name: 'input-text', extends: 'input', component: PrimeInputType, wrappers: ['input-text']}
        ]
      }),
    ]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ]
};
