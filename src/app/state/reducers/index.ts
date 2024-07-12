import {
  ActionReducerMap, MetaReducer
} from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromSettings from './settings.reducer';
import * as fromMessaging from './message.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface State {
  router: RouterReducerState<any>;
  [fromAuth.authKey]: any;
  [fromSettings.settingsKey]: any;
  [fromMessaging.messagesKey]: any;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  [fromAuth.authKey]: fromAuth.authReducer,
  [fromSettings.settingsKey]: fromSettings.settingsReducer,
  [fromMessaging.messagesKey]: fromMessaging.messagesReducer
}

export const metaReducers: MetaReducer<State>[] = [];
