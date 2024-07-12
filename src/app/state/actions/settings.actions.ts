import { createAction, props } from "@ngrx/store";
import { MODULES } from "../../core/constants/modules.constants";
import { MODULE_KEYS } from "../../core/enums/module-keys.enum";
import { User } from "../../../generated/gql.types";

export const loadMe = createAction (
  `[${MODULES[MODULE_KEYS.settings].actionsName}] load Me`
);

export const loadMeSuccess = createAction (
  `[${MODULES[MODULE_KEYS.settings].actionsName}] load Me Success`,
  props<User>()
);

export const loadMeFailed = createAction (
  `[${MODULES[MODULE_KEYS.settings].actionsName}] load Me Failed`
);
