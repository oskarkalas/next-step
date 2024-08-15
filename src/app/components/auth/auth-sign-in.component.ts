import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {Router, RouterLink} from "@angular/router";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgIf} from "@angular/common";
import {MessagesModule} from "primeng/messages";
import {DividerModule} from "primeng/divider";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonDirective} from "primeng/button";
import {Message} from "primeng/api";
import {Observable, Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import {Ripple} from "primeng/ripple";
import {LoginInput} from "../../../generated/gql.types";
import {FullRoutesPathEnum} from "../../core/enums/full-routes-path.enum";
import {FormlyFieldConfig, FormlyModule} from "@ngx-formly/core";
import {FormlyBootstrapModule} from "@ngx-formly/bootstrap";
import {signIn} from "../../state/actions/auth.actions";
import {selectAuthData, selectAuthError} from "../../state/selectors/auth.selectors";
import {environment} from "../../../environments/environment";
import {AuthState} from "../../state/reducers/auth.reducer";

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

      <form [formGroup]="form" (ngSubmit)="onSubmit(usersPermissionsLoginInput)">
        <p-messages *ngIf="(errorStatus | async)" [(value)]="messages!" [enableService]="false"
                    [closable]="false"></p-messages>
        <formly-form [form]="form" [fields]="fields" [model]="usersPermissionsLoginInput"></formly-form>

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
  ],
  standalone: true
})
export class AuthSignInComponent implements OnInit, OnDestroy {

  form = new FormGroup({});
  messages: Message[] | undefined;
  usersPermissionsLoginInput: LoginInput = { email: '', password: ''};
  fields: Array<FormlyFieldConfig> = [ {
    fieldGroup: [
      {
        key: 'email',
        type: 'input-text',
        className: 'w-full mb-3',
        wrappers: ['panel'],
        props: {
          label: 'Email',
          placeholder: 'Enter email',
          required: true,
        }
      },
    {
      key: 'password',
      type: 'input-text',
      wrappers: ['panel'],
      props: {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter password',
        required: true,
      }
    }
  ]
}
  ];
  @Output() signIn = new EventEmitter<LoginInput>();
  protected readonly FullRoutesPathEnum = FullRoutesPathEnum;
  errorStatus: Observable<boolean>;
  authState?: Observable<AuthState>;
  onDestroy$: Subject<boolean> = new Subject();

  constructor(
    private store: Store,
    private router: Router,
  ) {
    this.errorStatus = this.store.select(selectAuthError);
    this.authState = this.store.select(selectAuthData);
  }

  ngOnInit() {
    this.messages = [{
      severity: 'error',
      summary: 'messages.errors.login.summary',
      detail:'messages.errors.login.detail'
    }];

    this.authState?.pipe(takeUntil(this.onDestroy$)).subscribe( {
      next: authData => {
        if(authData && authData.auth && authData.auth.jwt && !authData.err) {
          localStorage.setItem('token', authData.auth.jwt);
          this.router.navigate([FullRoutesPathEnum.DASHBOARD]).then(r => console.log(r))
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    })

    const tokenUrlParam = this.router.routerState.snapshot.root.queryParamMap.get('accessToken');

    if (tokenUrlParam) {
      localStorage.setItem('token', tokenUrlParam);
      this.router.navigate([FullRoutesPathEnum.DASHBOARD]).then(r => console.log(r))
    }
  }

  onSubmit(loginInput: LoginInput) {
    if(this.form.valid) {
      this.store.dispatch(signIn(loginInput));
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  redirectToGoogleLogin() {
    window.location.href = environment.socials?.GOOGLE.redirectUrl;
  }
}
