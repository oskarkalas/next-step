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
import {PrimeFieldWrapper} from "../../components/molecules/formly/wrappers/prime-field-wrapper";
import {PrimeInputType} from "../../components/molecules/formly/types/prime-input-type";
import {PrimeCheckboxType} from "../../components/molecules/formly/types/prime-checkbox-type";
import {authKey, authReducer} from "../../state/reducers/auth.reducer";
import {AuthEffects} from "../../state/effects/auth.effects";
import {MessagesModule} from "primeng/messages";


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
      importProvidersFrom(
        StoreModule.forFeature(authKey, authReducer),
        EffectsModule.forFeature([AuthEffects, SettingsEffects]),
        FORMLY_SETTINGS,
        MessagesModule
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
