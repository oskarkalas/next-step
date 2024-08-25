import { createAction, props } from "@ngrx/store";
import { MODULES } from "../../core/constants/modules.constants";
import { MODULE_KEYS } from "../../core/enums/module-keys.enum";
import { LoginInput, LoginResponse } from "../../../generated/gql.types";

export const signIn = createAction (
  `[${MODULES[MODULE_KEYS.auth].actionsName}] Sign In`,
  props<LoginInput>()
);

export const signInSuccess = createAction (
  `[${MODULES[MODULE_KEYS.auth].actionsName}] Sign In Success`,
  props<{data: LoginResponse, err?: boolean}>()
);

export const signInFailed = createAction (
  `[${MODULES[MODULE_KEYS.auth].actionsName}] Sign In Failed`,
  props<{err: boolean}>()
);

export const registerUser = createAction (
  `[${MODULES[MODULE_KEYS.auth].actionsName}] Register User`,
  props<LoginInput>()
);

export const registerUserSuccess = createAction (
  `[${MODULES[MODULE_KEYS.auth].actionsName}] Register User Success`,
  props<{data: LoginResponse}>()
);

export const registerUserFailed = createAction (
  `[${MODULES[MODULE_KEYS.auth].actionsName}] Register User Failed`,
  props<{err: any}>()
);

