import { createReducer, on } from "@ngrx/store";
import { MODULE_KEYS } from "../../core/enums/module-keys.enum";
import {signInFailed, signInSuccess} from "../actions/auth.actions";
import {LoginResponse} from "../../../generated/gql.types";

export interface AuthState {
  auth: LoginResponse | null
  err: boolean
}

export const initialState: AuthState = {
  auth: null,
  err: false
}

export const authKey = MODULE_KEYS.auth;

export const authReducer = createReducer(
  initialState,
  on(signInSuccess, (state, auth) => (
    {
      ...state,
      auth: auth.data,
    }
  )),
  on(signInFailed, (state, err) => ({
    ...state,
    ...err
  }))
)
