import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule, ButtonProps } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { LoginInput } from '../../../../generated/gql.types';
import { RoutesPathsEnum } from '../../../core/enums/routes-paths.enum';
import { CardComponent, ICard } from '../../atoms/card/card.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { SocialLoginEnum } from '../../../../environments/environment.model';

@Component({
  selector: 'app-sign-in-composite',
  template: `
    <app-card [cardConfig]="cardConfig">
      <p>
        <span>Don't have an account? </span>
        <a [routerLink]="[FullRoutesPathEnum.SIGN_UP]">Create today!</a>
      </p>
      <form [formGroup]="loginForm!" (ngSubmit)="onSubmit(loginInput)">
        <formly-form [form]="loginForm!" [fields]="fields!" [model]="loginInput"></formly-form>
        <p>
          <a [routerLink]="[FullRoutesPathEnum.FORGOT_PASSWORD]">Forgot password?</a>
        </p>
        <app-button
          [buttonProps]="sendButtonProps"
          [full]="true"
          >
        </app-button>
      </form>
      <p-divider/>
      <app-button
        (click)="getSocialLogin(SocialLoginEnum.GOOGLE)"
        [buttonProps]="googleButtonProps"
        [full]="true"></app-button>
    </app-card>
  `,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    MessagesModule,
    DividerModule,
    CheckboxModule,
    ButtonModule,
    Ripple,
    FormlyModule,
    NgIf,
    AsyncPipe,
    CardModule,
    ButtonComponent,
    CardComponent,
    CardComponent,
    ButtonComponent,
  ],
  standalone: true
})
export class SignInComposite {
  @Input() loginInProgress = false;
  @Input() loginForm?: FormGroup = new FormGroup({email: new FormControl(), password: new FormControl()});
  @Input() fields?: Array<FormlyFieldConfig>;
  @Output() startLogin = new EventEmitter<LoginInput>();
  @Output() startSocialLogin = new EventEmitter<SocialLoginEnum>();
  cardConfig: ICard;
  googleButtonProps: ButtonProps;
  sendButtonProps: ButtonProps;
  loginInput = { email: 'oskar.kalas4@seznam.cz', password: 'ferda123' }; // todo for developing only after them will be removed

  constructor() {
    this.cardConfig = {
      header: 'Sign In',
      style: {width: '350px'}
    };
    this.googleButtonProps ={
      label: 'Login with Google',
      icon: 'pi pi-google',
      style: {width: '100%'},
      severity: 'contrast',
    };
    this.sendButtonProps = {
      type: 'submit',
      label: 'Sign In',
      icon: 'pi pi-lock',
      style: {width: '100%'},
      size: 'large',
      loading: this.loginInProgress,
    };
  }

  onSubmit(credentials: LoginInput) {
    this.startLogin.emit(credentials);
  }

  getSocialLogin(social: SocialLoginEnum) {
    this.startSocialLogin.emit(social);
  }

  protected readonly FullRoutesPathEnum = RoutesPathsEnum;
  protected readonly SocialLoginEnum = SocialLoginEnum;
}
