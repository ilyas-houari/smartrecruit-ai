import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { roleGuard } from './role.guard';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';


describe('roleGuard', () => {

  let authServiceMock: { getUser: ReturnType<typeof vi.fn> };
  let routerMock: { navigate: ReturnType<typeof vi.fn> };


  beforeEach(() => {

    authServiceMock = {
      getUser: vi.fn()
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


  function runGuard(
    allowedRoles: User['role'][] | undefined
  ): boolean {

    const route = {
      data: { roles: allowedRoles }
    } as unknown as ActivatedRouteSnapshot;

    return TestBed.runInInjectionContext(() =>
      roleGuard(route, {} as never)
    ) as boolean;

  }


  it('allows navigation when the route declares no role restriction', () => {

    authServiceMock.getUser.mockReturnValue({ role: 'CANDIDATE' });

    expect(runGuard(undefined)).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();

  });


  it('allows navigation when there is no logged-in user (authGuard already handles that case)', () => {

    authServiceMock.getUser.mockReturnValue(null);

    expect(runGuard(['RECRUITER'])).toBe(true);

  });


  it('allows navigation when the user role matches the allowed roles', () => {

    authServiceMock.getUser.mockReturnValue({ role: 'RECRUITER' });

    expect(runGuard(['RECRUITER'])).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();

  });


  it('blocks navigation and redirects to the user\'s own dashboard on role mismatch', () => {

    authServiceMock.getUser.mockReturnValue({ role: 'CANDIDATE' });

    expect(runGuard(['ADMIN'])).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/candidate/dashboard']);

  });


  it('redirects a mismatched recruiter to the recruiter dashboard', () => {

    authServiceMock.getUser.mockReturnValue({ role: 'RECRUITER' });

    expect(runGuard(['ADMIN'])).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/recruiter/dashboard']);

  });


  it('redirects a mismatched admin to the admin dashboard', () => {

    authServiceMock.getUser.mockReturnValue({ role: 'ADMIN' });

    expect(runGuard(['CANDIDATE'])).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/admin/dashboard']);

  });

});
