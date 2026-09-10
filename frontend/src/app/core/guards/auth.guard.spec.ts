import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';


describe('authGuard', () => {

  let authServiceMock: { isLoggedIn: ReturnType<typeof vi.fn> };
  let routerMock: { navigate: ReturnType<typeof vi.fn> };


  beforeEach(() => {

    authServiceMock = {
      isLoggedIn: vi.fn()
    };

    routerMock = {
      navigate: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

  });


  function runGuard(): boolean {

    return TestBed.runInInjectionContext(() =>
      authGuard(
        {} as never,
        {} as never
      )
    ) as boolean;

  }


  it('allows navigation when the user is logged in', () => {

    authServiceMock.isLoggedIn.mockReturnValue(true);

    expect(runGuard()).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();

  });


  it('blocks navigation and redirects to /login when the user is not logged in', () => {

    authServiceMock.isLoggedIn.mockReturnValue(false);

    expect(runGuard()).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);

  });

});
