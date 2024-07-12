import { createReducer, on } from "@ngrx/store";
import { MODULE_KEYS } from "../../core/enums/module-keys.enum";
import { loadMeSuccess } from "../actions/settings.actions";
import { User } from "../../../generated/gql.types";

export interface SettingsState {
  me: User | null
}

export const initialState: SettingsState = {
  me: null
}

export const settingsKey = MODULE_KEYS.settings;

export const settingsReducer = createReducer(
  initialState,
  on(loadMeSuccess, (state, me) => (
    {
      ...state,
      ...me
    }
  )),
)
