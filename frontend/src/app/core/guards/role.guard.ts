import { inject } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthService } from '../services/auth.service';

import { UserRole } from '../models/user.model';


function roleHomeUrl(role: UserRole): string {

  switch (role) {

    case 'CANDIDATE':
      return '/candidate/dashboard';

    case 'RECRUITER':
      return '/recruiter/dashboard';

    case 'ADMIN':
      return '/admin/dashboard';

  }

}


/*
 * Route-level authorization (master prompt Section 48: role
 * is not enough on its own for resource ownership, but the
 * frontend should at least stop a wrong-role user from
 * reaching another persona's screens by URL).
 *
 * Usage: canActivate: [authGuard, roleGuard], data: { roles: ['RECRUITER'] }
 */

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {

  const authService = inject(AuthService);

  const router = inject(Router);


  const allowedRoles =
    route.data['roles'] as UserRole[] | undefined;


  const user = authService.getUser();


  if (!allowedRoles || !user) {

    return true;

  }


  if (allowedRoles.includes(user.role)) {

    return true;

  }


  router.navigate([
    roleHomeUrl(user.role)
  ]);


  return false;

};
