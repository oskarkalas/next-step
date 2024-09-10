import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {User} from "../../../generated/gql.types";

export  const SETTINGS_ACTIONS = createActionGroup( {
  source: 'SETTINGS',
  events: {
    loadMe: emptyProps(),
    loadMeSuccess: props<User>(),
    loadMeFailed: emptyProps(),
    }
  }
)
