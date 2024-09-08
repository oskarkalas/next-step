import { createReducer, on } from "@ngrx/store";
import { MODULE_KEYS } from "../../core/enums/module-keys.enum";
import {signIn, signInFailed, signInSuccess} from "../actions/auth.actions";
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
  on(signInSuccess, (state, auth) => (
    {
      ...state,
      auth: auth.data,
      loading: false,
    }
  )),
  on(signIn, (state) => ({
    ...state,
    loading: true
  })),
  on(signInFailed, (state, err) => ({
    ...state,
    ...err,
    loading: false
  }))
)
