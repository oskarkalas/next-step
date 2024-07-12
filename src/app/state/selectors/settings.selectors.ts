import {createFeatureSelector, createSelector} from "@ngrx/store";
import {settingsKey, SettingsState} from "../reducers/settings.reducer";

export const selectSettingsState = createFeatureSelector<SettingsState>(settingsKey);
export const selectSettingsMe = createSelector(selectSettingsState, (state) => state.me);
