import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from "@ngrx/store";
import {of, tap} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {AuthService} from "../../core/services/auth.service";
import {MESSAGING_ACTIONS} from "../actions/messages.actions";
import {MessageCategory} from "../../components/molecules/messages/messages.enum";
import {MessageConfigService} from "../../components/molecules/messages/message-config.service";
import {AUTH_ACTIONS} from "../actions/auth.actions";


@Injectable({
  providedIn: 'root'
})
export class AuthEffects {

  signIn$ = createEffect(() => this.actions.pipe(
      ofType(AUTH_ACTIONS.signIn),
      exhaustMap((payload) => {
        return this.authService.signIn(payload)
          .pipe(
            tap(result => {
              if (!result.data) {
                return this.store.dispatch(AUTH_ACTIONS.signInFailed({err: true}));
              }
            }),
            map(result => (
              {type: AUTH_ACTIONS.signInSuccess.type, data: result.data?.login, err: false}
            )),
            catchError((err) => (
             of(MESSAGING_ACTIONS.addMassage(
               { message: this.messageConfigService.getConfigData(MessageCategory.NETWORK_ERROR, err) }
              )))
             )
          );
      })
    )
  );

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private store: Store,
    private messageConfigService: MessageConfigService,
  ) {}
}
