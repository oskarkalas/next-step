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


@Injectable({
  providedIn: 'root'
})
export class AuthEffects {

  signIn$ = createEffect(() => this.actions.pipe(
      ofType(authActions.signIn),
      exhaustMap((payload) => {
        return this.authService.signIn(payload)
          .pipe(
            tap(result => {
              if (!result.data) {

                return this.store.dispatch(authActions.signInFailed({err: true}));
              }

            }),
            map(result => (
              {type: authActions.signInSuccess.type, data: result.data?.login, err: false}
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
  //
  // registerUser = createEffect(() => this.actions.pipe(
  //     ofType(authActions.registerUser),
  //     exhaustMap((payload) => {
  //       return this.authService.register(payload)
  //         .pipe(
  //           tap(result => {
  //           }),
  //           map(result => (
  //             {type: authActions.registerUserSuccess.type, data: result.data}
  //           )),
  //           catchError((err) => (
  //             of(authActions.registerUserFailed(err)))
  //           )
  //         );
  //     })
  //   )
  // );

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private store: Store,
    private messageConfigService: MessageConfigService,
  ) {}
}
