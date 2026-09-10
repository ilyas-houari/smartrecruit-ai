import { Injectable } from '@angular/core';

import { User, UserRole } from '../models/user.model';


const STORAGE_KEY = 'smartrecruit_user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private currentUser: User | null =
    this.restoreUser();



  login(email: string): string {


    let role: UserRole;

    let redirectUrl = '';



    switch(email) {


      case 'candidat@candidat.com':

        role = 'CANDIDATE';

        redirectUrl = '/candidate/dashboard';

        break;



      case 'recruteur@recruteur.com':

        role = 'RECRUITER';

        redirectUrl = '/recruiter/dashboard';

        break;



      case 'admin@admin.com':

        role = 'ADMIN';

        redirectUrl = '/admin/dashboard';

        break;



      default:

        throw new Error('Invalid account');

    }


    this.setUser({

      id: 1,

      email,

      role

    });


    return redirectUrl;

  }




  /*
   * Public registration cannot create ADMIN accounts
   * (Master prompt Section 46).
   */

  register(email: string, role: 'CANDIDATE' | 'RECRUITER'): string {

    this.setUser({

      id: Date.now(),

      email,

      role

    });


    return role === 'CANDIDATE'
      ? '/candidate/dashboard'
      : '/recruiter/dashboard';

  }




  logout(): void {

    this.currentUser = null;

    sessionStorage.removeItem(STORAGE_KEY);

  }




  getUser(): User | null {

    return this.currentUser;

  }




  isLoggedIn(): boolean {

    return this.currentUser !== null;

  }




  private setUser(user: User): void {

    this.currentUser = user;

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(user)
    );

  }




  private restoreUser(): User | null {

    const raw =
      sessionStorage.getItem(STORAGE_KEY);


    if (!raw) {
      return null;
    }


    try {

      return JSON.parse(raw) as User;

    } catch {

      return null;

    }

  }


}
