import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {of, tap} from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as profileActions from '../actions/settings.actions';
import { SettingsService } from "../../modules/settings/settings.service";

@Injectable()
export class SettingsEffects {

  loadMe$ = createEffect(() => this.actions.pipe(
      ofType(profileActions.loadMe),
      exhaustMap(() => {
        return this.profileService.me()
          .pipe(
            tap(rs => {console.log(rs)}),
            map(me => (
              {type: profileActions.loadMeSuccess.type, me: me.data?.Me}
            )),
            catchError((err) => (
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
