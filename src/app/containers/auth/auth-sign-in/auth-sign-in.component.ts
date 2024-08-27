import {Component, OnInit} from "@angular/core";
import {RouterLink, RouterModule} from "@angular/router";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgIf} from "@angular/common";
import {MessagesModule} from "primeng/messages";
import {DividerModule} from "primeng/divider";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {FormlyModule} from "@ngx-formly/core";
import {RoutesPathsEnum} from "../../../core/enums/routes-paths.enum";
import {FormlyBootstrapModule} from "@ngx-formly/bootstrap";
import {AuthSignInService} from "./auth-sign-in.service";
import {AuthFormService} from "./auth-form.service";
import {LoginInput} from "../../../../generated/gql.types";

@Component({
  selector: 'app-auth-sign-in',
  template: `
    <div>
      <div>
        <h1>Welcome Back</h1>
        <h2>
          <span>Don't have an account? </span>
          <a [routerLink]="[FullRoutesPathEnum.SIGN_UP]">Create today!</a>
        </h2>
      </div>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit(loginInput)">
        <formly-form [form]="loginForm" [fields]="fields" [model]="loginInput"></formly-form>
        <div>
          <a [routerLink]="[FullRoutesPathEnum.FORGOT_PASSWORD]">Forgot password?</a>
        </div>
        <button pButton pRipple type="submit" label="Sign In"></button>
      </form>
      <div>
        <button (click)="redirectToGoogleLogin()">Login with google</button>
      </div>
    </div>
  `,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    RouterModule,
    MessagesModule,
    DividerModule,
    CheckboxModule,
    ButtonDirective,
    Ripple,
    FormlyModule,
    NgIf,
    FormlyBootstrapModule,
    AsyncPipe,
  ],
  standalone: true
})
export class AuthSignInComponent implements OnInit {
  loginForm: FormGroup;
  fields = this.authFormService.getFormFields();
  loginInput = { email: '', password: '' };

  constructor(
    private authFormService: AuthFormService,
    private authSignInService: AuthSignInService,
  ) {
    this.loginForm = this.authFormService.createForm();
  }

  ngOnInit() {
    this.authSignInService.handleAuthState();
    this.authSignInService.checkTokenUrlParam();
  }

  onSubmit(loginInput: LoginInput) {
    this.authSignInService.signInStart(loginInput, this.loginForm);
  }

  redirectToGoogleLogin() {
    this.authSignInService.redirectToGoogleLogin();
  }

  protected readonly FullRoutesPathEnum = RoutesPathsEnum;
}
