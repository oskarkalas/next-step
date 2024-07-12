import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from "@ngrx/store";
import {of, tap} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import * as authActions from '../actions/auth.actions';
import {AuthService} from "../../services/auth.service";
import {MESSAGING_ACTIONS} from "../actions/messages.actions";
import {MessageCategory} from "../../components/shared/messages/messages.enum";
import {MessageConfigService} from "../../components/shared/messages/message-config.service";

@Injectable()
export class AuthEffects {

  signIn$ = createEffect(() => this.actions.pipe(
      ofType(authActions.signIn),
      exhaustMap((payload) => {
        return this.authService.signIn(payload)
          .pipe(
            tap(result => {
              if (result.data) {
                this.authService.addToken(result.data?.login.jwt);
                this.store.dispatch(authActions.signInFailed({err: false}));
              } else {
                this.store.dispatch(authActions.signInFailed({err: true}));
              }
            }),
            map(result => (
              {type: authActions.signInSuccess.type, data: result.data?.login}
            )),
            catchError((err) => (
              of(MESSAGING_ACTIONS.addMassage({
                message: this.messageConfigService.getConfigData(MessageCategory.NETWORK_ERROR, err)
              })))
            )
          );
      })
    )
  );

  registerUser = createEffect(() => this.actions.pipe(
      ofType(authActions.registerUser),
      exhaustMap((payload) => {
        return this.authService.register(payload)
          .pipe(
            tap(result => {
              this.authService.addToken(result.data?.jwt)
            }),
            map(result => (
              {type: authActions.registerUserSuccess.type, data: result.data}
            )),
            catchError((err) => (
              of(authActions.registerUserFailed(err)))
            )
          );
      })
    )
  );

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private messageConfigService: MessageConfigService,
    private store: Store,
  ) {}
}
