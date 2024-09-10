import { createReducer, on } from "@ngrx/store";
import { MODULE_KEYS } from "../../core/enums/module-keys.enum";
import {AUTH_ACTIONS} from "../actions/auth.actions";
import {LoginResponse} from "../../../generated/gql.types";

export interface AuthState {
  auth: LoginResponse | null
  err: boolean
  loading: boolean;
}

export const initialState: AuthState = {
  auth: null,
  err: false,
  loading: false,
}

export const authKey = MODULE_KEYS.auth;

export const authReducer = createReducer(
  initialState,
  on(AUTH_ACTIONS.signInSuccess, (state, auth) => (
    {
      ...state,
      auth: auth.data,
      loading: false,
    }
  )),
  on(AUTH_ACTIONS.signIn, (state) => ({
    ...state,
    loading: true
  })),
  on(AUTH_ACTIONS.signInFailed, (state, err) => ({
    ...state,
    ...err,
    loading: false
  }))
)
