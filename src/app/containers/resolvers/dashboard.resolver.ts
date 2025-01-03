import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../state/reducers';
import { SETTINGS_ACTIONS } from '../../state/actions/settings.actions';
import { selectSettingsMe } from '../../state/selectors/settings.selectors';
import { of, take } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const dashboardResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store = inject(Store<State>);
  store.dispatch(SETTINGS_ACTIONS.loadMe());

  return store.select(selectSettingsMe).pipe(
    map((me) => {
      return !!me
    }),
    take(2),
    catchError(error => of(false))
  );
}
