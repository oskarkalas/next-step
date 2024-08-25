import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import {FormGroup} from "@angular/forms";
import {selectAuthData, selectAuthError} from "../../../state/selectors/auth.selectors";
import {AuthState} from "../../../state/reducers/auth.reducer";
import {FullRoutesPathEnum} from "../../../core/enums/full-routes-path.enum";
import {LoginInput} from "../../../../generated/gql.types";
import {signIn} from "../../../state/actions/auth.actions";
import {environment} from "../../../../environments/environment";


@Injectable({ providedIn: 'root' })
export class AuthSignInService {
  private onDestroy$ = new Subject<boolean>();
  errorStatus$: Observable<boolean> = this.store.select(selectAuthError);
  authState$: Observable<AuthState> = this.store.select(selectAuthData);

  constructor(private store: Store, private router: Router) {}

  handleAuthState(): void {
    this.authState$.pipe(takeUntil(this.onDestroy$)).subscribe(authData => {
      if (authData && authData.auth && authData.auth.jwt && !authData.err) {
        localStorage.setItem('token', authData.auth.jwt);
        this.router.navigate([FullRoutesPathEnum.DASHBOARD]);
      }
    });
  }

  checkTokenUrlParam(): void {
    const tokenUrlParam = this.router.routerState.snapshot.root.queryParamMap.get('accessToken');
    if (tokenUrlParam) {
      localStorage.setItem('token', tokenUrlParam);
      this.router.navigate([FullRoutesPathEnum.DASHBOARD]);
    }
  }

  signInStart(loginInput: LoginInput, form: FormGroup): void {
    if (form.valid) {
      this.store.dispatch(signIn(loginInput));
    } else {
      form.markAllAsTouched();
    }
  }

  redirectToGoogleLogin(): void {
    window.location.href = environment.socials?.GOOGLE.redirectUrl;
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }
}
