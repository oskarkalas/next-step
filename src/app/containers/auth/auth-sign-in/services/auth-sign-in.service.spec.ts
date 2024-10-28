import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthSignInService } from './auth-sign-in.service';
import { AUTH_ACTIONS } from '../../../../state/actions/auth.actions';
import { LoginInput } from '../../../../../generated/gql.types';

describe('AuthSignInService', () => {
  let service: AuthSignInService;
  let store: Store;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        ReactiveFormsModule
      ],
      providers: [AuthSignInService]
    });
    service = TestBed.inject(AuthSignInService);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  describe('signInStart', () => {
    it('should dispatch signIn action if form is valid', () => {
      const loginInput: LoginInput = { email: 'test@example.com', password: 'password' };
      const form: FormGroup = new FormGroup({
        email: new FormControl('test@example.com', [Validators.required, Validators.email]),
        password: new FormControl('password', [Validators.required])
      });

      service.signInStart(loginInput, form);

      expect(store.dispatch).toHaveBeenCalledWith(AUTH_ACTIONS.signIn(loginInput));
    });

    it('should mark form as touched if form is invalid', () => {
      const loginInput: LoginInput = { email: 'test@example.com', password: 'password' };
      const form: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required])
      });

      spyOn(form, 'markAllAsTouched');

      service.signInStart(loginInput, form);

      expect(form.markAllAsTouched).toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
