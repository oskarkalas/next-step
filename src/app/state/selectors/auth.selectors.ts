import {createFeatureSelector, createSelector} from "@ngrx/store";
import {authKey, AuthState} from "../reducers/auth.reducer";

export const selectAuth= createFeatureSelector<AuthState>(authKey);
export const selectAuthError = createSelector(selectAuth, (authState) => authState?.err);
export const selectAuthData = createSelector(selectAuth, (authState) => authState);
