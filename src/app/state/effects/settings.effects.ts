import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {SettingsService} from "../../services/settings.service";
import {SETTINGS_ACTIONS} from "../actions/settings.actions";

@Injectable()
export class SettingsEffects {

  loadMe$ = createEffect(() => this.actions.pipe(
      ofType(SETTINGS_ACTIONS.loadMe),
      exhaustMap(() => {
        return this.profileService.queryMe()
          .pipe(
            map(me => (
              {type: SETTINGS_ACTIONS.loadMeSuccess.type, me: me.data?.Me}
            )),
            catchError(() => (
              of(SETTINGS_ACTIONS.loadMeFailed())))
          );
      })
    )
  );

  constructor(
    private actions: Actions,
    private profileService: SettingsService
  ) {}
}
