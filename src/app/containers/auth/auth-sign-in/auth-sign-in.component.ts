import {Component, OnDestroy, OnInit} from "@angular/core";
import {RouterLink, RouterOutlet} from "@angular/router";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgIf} from "@angular/common";
import {MessagesModule} from "primeng/messages";
import {DividerModule} from "primeng/divider";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {FullRoutesPathEnum} from "../../../core/enums/full-routes-path.enum";
import {FormlyModule} from "@ngx-formly/core";
import {FormlyBootstrapModule} from "@ngx-formly/bootstrap";
import {AuthSignInService} from "./auth-sign-in.service";
import {AuthFormService} from "./auth-form.service";
import {LoginInput} from "../../../../generated/gql.types";

@Component({
  selector: 'app-auth-sign-in',
  template: `
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        <span class="text-600 font-medium line-height-3">Don't have an account?</span>
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
           [routerLink]="[FullRoutesPathEnum.SIGN_UP]">Create today!</a>
      </div>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit(loginInput)">
        <formly-form [form]="loginForm" [fields]="fields" [model]="loginInput"></formly-form>

        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center">
            <p-checkbox id="rememberme1" [binary]="true" styleClass="mr-2"></p-checkbox>
            <label for="rememberme1" class="text-900">Remember me</label>
          </div>
          <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
             [routerLink]="[FullRoutesPathEnum.FORGOT_PASSWORD]">Forgot password?</a>
        </div>
        <button pButton pRipple type="submit" label="Sign In" class="btn btn-default w-full"></button>
      </form>
      <p-divider></p-divider>
      <button (click)="redirectToGoogleLogin()">Login with google</button>
    </div>
  `,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MessagesModule,
    AsyncPipe,
    DividerModule,
    CheckboxModule,
    ButtonDirective,
    Ripple,
    FormlyModule,
    NgIf,
    FormlyBootstrapModule,
    RouterOutlet,
  ],
  standalone: true
})
export class AuthSignInComponent implements OnInit, OnDestroy {
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

  ngOnDestroy() {
    this.authSignInService.ngOnDestroy();
  }

  protected readonly FullRoutesPathEnum = FullRoutesPathEnum;
}
