import {createActionGroup, props} from "@ngrx/store";
import {LoginInput, LoginResponse} from "../../../generated/gql.types";

export const AUTH_ACTIONS = createActionGroup({
  source: 'AUTH',
  events: {
    signIn: props<LoginInput>(),
    signInSuccess: props<{data: LoginResponse, err?: boolean}>(),
    signInFailed:  props<{err: boolean}>(),
    registerUser: props<LoginInput>(),
    registerUserSuccess: props<{ id: number }>(),
    registerUserFailed: props<{err: boolean}>(),
  },
});

