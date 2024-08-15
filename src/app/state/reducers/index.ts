import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';

export interface State {
  router: RouterReducerState<any>;
  [fromAuth.authKey]: any;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  [fromAuth.authKey]: fromAuth.authReducer,
}

export const metaReducers: MetaReducer<State>[] = [];
