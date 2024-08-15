import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of, tap} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import * as profileActions from '../actions/settings.actions';
import {SettingsService} from "../../services/settings.service";

@Injectable()
export class SettingsEffects {

  loadMe$ = createEffect(() => this.actions.pipe(
      ofType(profileActions.loadMe),
      exhaustMap(() => {
        return this.profileService.queryMe()
          .pipe(
            tap(rs => {console.log(rs)}),
            map(me => (
              {type: profileActions.loadMeSuccess.type, me: me.data?.Me}
            )),
            catchError(() => (
              of(profileActions.loadMeFailed())))
          );
      })
    )
  );

  constructor(
    private actions: Actions,
    private profileService: SettingsService
  ) {}
}
