import {Route} from "@angular/router";
import {importProvidersFrom} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {SettingsEffects} from "../../state/effects/settings.effects";
import {FormlyModule} from "@ngx-formly/core";
import {AuthLayoutComponent} from "./auth.layout.component";
import {AuthSignUpComponent} from "./auth-sign-up/auth-sign-up.component";
import {AuthSignInComponent} from "./auth-sign-in/auth-sign-in.component";
import {RoutesNamesEnum} from "../../core/enums/routes-names.enum";
import {PrimeFieldWrapper} from "../../components/shared/prime-formly-templates/wrappers/prime-field-wrapper";
import {PrimeInputType} from "../../components/shared/prime-formly-templates/types/prime-input-type";
import {PrimeCheckboxType} from "../../components/shared/prime-formly-templates/types/prime-checkbox-type";
import {authKey, authReducer} from "../../state/reducers/auth.reducer";
import {provideAnimations} from "@angular/platform-browser/animations";


const FORMLY_SETTINGS = FormlyModule.forRoot({
  validationMessages: [
    { name: 'required', message: 'This field is required' },
  ],
  wrappers: [
    {name: 'panel', component: PrimeFieldWrapper},
  ],
  types: [
    {name: 'input-text', extends: 'input', component: PrimeInputType, wrappers: ['input-text']},
    {name: 'input-checkbox', extends: 'checkbox', component: PrimeCheckboxType, wrappers: ['input-text']},
  ]
});

export const authRoutes: Route[] = [
  {
    path: '',
    providers: [
      provideAnimations(),
      importProvidersFrom(
        StoreModule.forFeature(authKey, authReducer),
        EffectsModule.forFeature([SettingsEffects]),
        FORMLY_SETTINGS,
      ),
    ],
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: AuthSignInComponent,
      },
      {
        path: RoutesNamesEnum.SIGN_IN,
        component: AuthSignInComponent,
      },
      {
        path: RoutesNamesEnum.SIGN_UP,
        component: AuthSignUpComponent,
      }
    ]
  },
];
