import {Route} from "@angular/router";
import {importProvidersFrom} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {SettingsEffects} from "../../state/effects/settings.effects";
import {settingsKey, settingsReducer} from "../../state/reducers/settings.reducer";
import {AuthLayoutComponent} from "./auth.layout.component";
import {AuthSignUpComponent} from "./auth-sign-up/auth-sign-up.component";
import {AuthSignInComponent} from "./auth-sign-in/auth-sign-in.component";
import {RoutesNamesEnum} from "../../core/enums/routes-names.enum";

export const authRoutes: Route[] = [
  {
    path: '',
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(settingsKey, settingsReducer),
        EffectsModule.forFeature([SettingsEffects])
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
