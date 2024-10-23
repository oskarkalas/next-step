import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { LoginInput } from '../../../../generated/gql.types';
import { AuthState } from '../../../state/reducers/auth.reducer';
import { selectAuthData } from '../../../state/selectors/auth.selectors';
import { AuthSignInService } from './services/auth-sign-in.service';
import { SignInComposite } from '../../../components/composites/auth/sign-in.composite';
import { SocialLoginEnum } from '../../../../environments/environment.model';
import { formlyAuthSignInConfig } from '../../../configs/formly/auth.formly.config';

@Component({
  selector: 'app-auth-sign-in',
  template: `
    <app-sign-in-composite
      [fields]="fields"
      [loginForm]="loginForm"
      [loginInProgress]="(loginStatus$ | async)?.loading!"
      (startLogin)="sendLogin($event)"
      (startSocialLogin)="redirectToSocialEndpoint($event)"></app-sign-in-composite>
  `,
  imports: [
    ReactiveFormsModule,
    SignInComposite,
    AsyncPipe
  ],
  standalone: true
})
export class AuthSignInContainer implements OnInit, OnDestroy {
  loginForm: FormGroup;
  fields: Array<FormlyFieldConfig>;
  loginStatus$: Observable<AuthState> | undefined;
  loginSub: Subscription = new Subscription()

  constructor(
    private authSignInService: AuthSignInService,
    private store: Store
  ) {
    this.loginForm = new FormGroup({});
    this.loginStatus$ = this.store.select(selectAuthData);
    this.fields = formlyAuthSignInConfig()
  }

  ngOnInit() {
    this.authSignInService.checkTokenUrlParam();
    this.authSignInService.handleAuthState();
    this.loginSub.add(
      this.loginStatus$?.subscribe(status => {
        if(status?.auth?.jwt) {
          this.authSignInService.redirectToDashboard(status.auth.jwt);
        }
      })
    );
  }

  sendLogin(credentials: LoginInput) {
    this.authSignInService.signInStart(credentials, this.loginForm);
  }

  redirectToSocialEndpoint(social: SocialLoginEnum) {
    switch (social) {
      case SocialLoginEnum.GOOGLE: {
        this.authSignInService.redirectToGoogleLogin();
        break;
      }
    }
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }
}
