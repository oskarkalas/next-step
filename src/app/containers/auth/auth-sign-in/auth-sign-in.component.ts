import {Component, OnDestroy, OnInit} from "@angular/core";
import {RouterLink, RouterModule} from "@angular/router";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgIf} from "@angular/common";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {MessagesModule} from "primeng/messages";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {FormlyModule} from "@ngx-formly/core";
import {FormlyBootstrapModule} from "@ngx-formly/bootstrap";
import {AuthFormService} from "./auth-form.service";
import {LoginInput} from "../../../../generated/gql.types";
import {RoutesPathsEnum} from "../../../core/enums/routes-paths.enum";
import {AuthState} from "../../../state/reducers/auth.reducer";
import {selectAuthData} from "../../../state/selectors/auth.selectors";
import {AuthSignInService} from "./auth-sign-in.service";
import { ButtonComponent } from '../../../components/atoms/button/button.component';

@Component({
  selector: 'app-auth-sign-in',
  template: `
    <p-card [header]="'Sign In'" [style]="{width: '350px'}">
      <p>
        <span>Don't have an account? </span>
        <a [routerLink]="[FullRoutesPathEnum.SIGN_UP]">Create today!</a>
      </p>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit(loginInput)">
        <formly-form [form]="loginForm" [fields]="fields" [model]="loginInput"></formly-form>
        <p>
          <a [routerLink]="[FullRoutesPathEnum.FORGOT_PASSWORD]">Forgot password?</a>
        </p>
        <app-button
          [buttonProps]="{
          type: 'submit',
          label: 'Sign In',
          icon: 'pi pi-lock',
          style: {width: '100%'},
          size: 'large',
          loading: (loginStatus$ | async)?.loading }"
          [full]="true"
          >
        </app-button>
      </form>
      <p-divider/>
      <app-button
        (click)="redirectToGoogleLogin()"
        [buttonProps]="{
          label: 'Login with Google',
          icon: 'pi pi-google',
          style: {width: '100%'},
          severity: 'contrast'}"
        [full]="true"></app-button>
    </p-card>
  `,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    RouterModule,
    MessagesModule,
    DividerModule,
    CheckboxModule,
    ButtonModule,
    Ripple,
    FormlyModule,
    NgIf,
    FormlyBootstrapModule,
    AsyncPipe,
    CardModule,
    ButtonComponent
  ],
  standalone: true
})
export class AuthSignInComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  fields = this.authFormService.getFormFields();
  loginInput = { email: 'oskar.kalas4@seznam.cz', password: 'ferda123' };
  loginStatus$: Observable<AuthState> | undefined;
  loginSub: Subscription = new Subscription()

  constructor(
    private authFormService: AuthFormService,
    private authSignInService: AuthSignInService,
    private store: Store
  ) {
    this.loginForm = this.authFormService.createForm();
    this.loginStatus$ = this.store.select(selectAuthData);
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

  onSubmit(loginInput: LoginInput) {
    this.authSignInService.signInStart(loginInput, this.loginForm);
  }

  redirectToGoogleLogin() {
    this.authSignInService.redirectToGoogleLogin();
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }

  protected readonly FullRoutesPathEnum = RoutesPathsEnum;
}
