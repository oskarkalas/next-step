import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from "@angular/forms";
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {selectAuthData} from "../../../state/selectors/auth.selectors";
import {AuthState} from "../../../state/reducers/auth.reducer";
import {RoutesPathsEnum} from "../../../core/enums/routes-paths.enum";
import {LoginInput} from "../../../../generated/gql.types";
import {AUTH_ACTIONS} from "../../../state/actions/auth.actions";
import {environment} from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthSignInService {
  authState$: Observable<AuthState> = this.store.select(selectAuthData);

  constructor(private store: Store, private router: Router) {}

  handleAuthState(): void {
    this.authState$.pipe(
      map((authState: AuthState) => {
        if (authState && authState.auth && authState.auth.jwt && !authState.err) {
          localStorage.setItem('token', authState.auth.jwt);
          window.location.href = RoutesPathsEnum.DASHBOARD;
        }
      })
    );
  }

  checkTokenUrlParam(): void {
    const tokenUrlParam = this.router.routerState.snapshot.root.queryParamMap.get('accessToken');
    if (tokenUrlParam) {
      localStorage.setItem('token', tokenUrlParam);
      window.location.href = RoutesPathsEnum.DASHBOARD;
    }
  }

  signInStart(loginInput: LoginInput, form: FormGroup): void {
    if (form.valid) {
      this.store.dispatch(AUTH_ACTIONS.signIn(loginInput));
    } else {
      form.markAllAsTouched();
    }
  }

  redirectToGoogleLogin(): void {
    window.location.href = environment.socials?.GOOGLE.redirectUrl;
  }

  redirectToDashboard(token: string): void {
    localStorage.setItem('token', token);
    window.location.href = RoutesPathsEnum.DASHBOARD;
  }
}
