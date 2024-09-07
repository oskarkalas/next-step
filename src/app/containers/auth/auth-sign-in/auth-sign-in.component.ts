import {Component, OnDestroy, OnInit} from "@angular/core";
import {RouterLink, RouterModule} from "@angular/router";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgIf} from "@angular/common";
import {MessagesModule} from "primeng/messages";
import {DividerModule} from "primeng/divider";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {FormlyModule} from "@ngx-formly/core";
import {RoutesPathsEnum} from "../../../core/enums/routes-paths.enum";
import {FormlyBootstrapModule} from "@ngx-formly/bootstrap";
import {AuthSignInService} from "./auth-sign-in.service";
import {AuthFormService} from "./auth-form.service";
import {LoginInput} from "../../../../generated/gql.types";
import {TileComponent} from "../../../components/design/tile/tile.component";
import { Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AuthState} from "../../../state/reducers/auth.reducer";
import {selectAuthData} from "../../../state/selectors/auth.selectors";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-auth-sign-in',
  template: `
    <p-card [header]="'Welcome Back'">

        <p>
          <span>Don't have an account? </span>
          <a [routerLink]="[FullRoutesPathEnum.SIGN_UP]">Create today!</a>
        </p>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit(loginInput)">
        <formly-form [form]="loginForm" [fields]="fields" [model]="loginInput"></formly-form>
        <div>
          <a [routerLink]="[FullRoutesPathEnum.FORGOT_PASSWORD]">Forgot password?</a>
        </div>
        <p>
          <p-button type="submit" label="Sign In"></p-button>
        </p>

      </form>
        <hr>
      <div>
        <button (click)="redirectToGoogleLogin()">Login with google</button>
      </div>
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
    TileComponent,
    CardModule,
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
