import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AuthState } from '../../../../state/reducers/auth.reducer';
import { AUTH_ACTIONS } from '../../../../state/actions/auth.actions';
import { RoutesPathsEnum } from '../../../../core/enums/routes-paths.enum';
import { environment } from '../../../../../environments/environment';
import { AuthSignInService } from './auth-sign-in.service';
import { Provider, Role } from '../../../../../generated/gql.types';

describe('AuthSignInService', () => {
  let service: AuthSignInService;
  let store: jasmine.SpyObj<Store>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate'], {
      routerState: {
        snapshot: {
          root: {
            queryParamMap: {
              get: jasmine.createSpy().and.returnValue(null) // mock the query param map get method
            }
          }
        }
      }
    });

    TestBed.configureTestingModule({
      providers: [
        AuthSignInService,
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    service = TestBed.inject(AuthSignInService);
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should handle valid auth state and redirect', () => {
    const authState: AuthState = {
      auth: { jwt: 'test-token', user: {
          id: 1,
          email: 'user@email.com',
          picture: '',
          provider: [Provider.Google],
          role: Role.User, refreshToken: 'refreshToken',
          createdAt: undefined,
          updatedAt: undefined
        }
      },
      err: false,
      loading: false
    };
    store.select.and.returnValue(of(authState));

    spyOn(localStorage, 'setItem');
    spyOnProperty(window.location, 'href', 'set'); // Correct usage for spying on a property

    service.handleAuthState();

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'test-token');
    expect(window.location.href).toBe(RoutesPathsEnum.DASHBOARD);
  });

  it('should check token URL param and redirect', () => {
    // Mock the query param to return a token
    spyOn(router.routerState.snapshot.root.queryParamMap, 'get').and.returnValue('test-token');

    spyOn(localStorage, 'setItem');
    spyOnProperty(window.location, 'href', 'set');

    service.checkTokenUrlParam();

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'test-token');
    expect(window.location.href).toBe(RoutesPathsEnum.DASHBOARD);
  });

  it('should dispatch sign-in action for valid form', () => {
    const loginInput = { email: 'user@email.com', password: 'pass' };
    const form = { valid: true, markAllAsTouched: jasmine.createSpy() } as any;

    service.signInStart(loginInput, form);

    expect(store.dispatch).toHaveBeenCalledWith(AUTH_ACTIONS.signIn(loginInput));
  });

  it('should mark all as touched for invalid form', () => {
    const loginInput = { email: 'user@email.com', password: 'pass' };;
    const form = { valid: false, markAllAsTouched: jasmine.createSpy() } as any;

    service.signInStart(loginInput, form);

    expect(form.markAllAsTouched).toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should redirect to Google login', () => {
    spyOnProperty(window.location, 'href', 'set');

    service.redirectToGoogleLogin();

    expect(window.location.href).toBe(environment.socials?.GOOGLE.redirectUrl);
  });

  it('should redirect to dashboard after token set', () => {
    spyOn(localStorage, 'setItem');
    spyOnProperty(window.location, 'href', 'set');

    service.redirectToDashboard('test-token');

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'test-token');
    expect(window.location.href).toBe(RoutesPathsEnum.DASHBOARD);
  });
});
