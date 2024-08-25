import {Route} from "@angular/router";
import {importProvidersFrom} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {SettingsEffects} from "../../state/effects/settings.effects";
import {settingsKey, settingsReducer} from "../../state/reducers/settings.reducer";
import {DashboardComponent} from "./dashboard.component";

export const dashboardRoutes: Route[] = [
  {
    path: '',
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(settingsKey, settingsReducer),
        EffectsModule.forFeature([SettingsEffects])
      ),
    ],
    component: DashboardComponent,
  },
];
