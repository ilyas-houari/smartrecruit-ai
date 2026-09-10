import { AuthService } from './auth.service';


describe('AuthService', () => {

  beforeEach(() => {

    sessionStorage.clear();

  });


  describe('login', () => {

    it('logs in the candidate demo account and returns the candidate redirect', () => {

      const service = new AuthService();

      const redirectUrl = service.login('candidat@candidat.com');

      expect(redirectUrl).toBe('/candidate/dashboard');
      expect(service.getUser()?.role).toBe('CANDIDATE');
      expect(service.isLoggedIn()).toBe(true);

    });


    it('logs in the recruiter demo account and returns the recruiter redirect', () => {

      const service = new AuthService();

      const redirectUrl = service.login('recruteur@recruteur.com');

      expect(redirectUrl).toBe('/recruiter/dashboard');
      expect(service.getUser()?.role).toBe('RECRUITER');

    });


    it('logs in the admin demo account and returns the admin redirect', () => {

      const service = new AuthService();

      const redirectUrl = service.login('admin@admin.com');

      expect(redirectUrl).toBe('/admin/dashboard');
      expect(service.getUser()?.role).toBe('ADMIN');

    });


    it('throws for an unrecognized email and does not log the user in', () => {

      const service = new AuthService();

      expect(() => service.login('unknown@example.com')).toThrow('Invalid account');
      expect(service.isLoggedIn()).toBe(false);

    });

  });


  describe('register', () => {

    it('logs the new account in and returns the candidate redirect for CANDIDATE', () => {

      const service = new AuthService();

      const redirectUrl = service.register('new.candidate@example.com', 'CANDIDATE');

      expect(redirectUrl).toBe('/candidate/dashboard');
      expect(service.getUser()?.role).toBe('CANDIDATE');
      expect(service.isLoggedIn()).toBe(true);

    });


    it('logs the new account in and returns the recruiter redirect for RECRUITER', () => {

      const service = new AuthService();

      const redirectUrl = service.register('new.recruiter@example.com', 'RECRUITER');

      expect(redirectUrl).toBe('/recruiter/dashboard');
      expect(service.getUser()?.role).toBe('RECRUITER');

    });

  });


  describe('session persistence', () => {

    it('survives a page refresh (a new AuthService instance restores the session)', () => {

      const service = new AuthService();
      service.login('candidat@candidat.com');

      const serviceAfterRefresh = new AuthService();

      expect(serviceAfterRefresh.isLoggedIn()).toBe(true);
      expect(serviceAfterRefresh.getUser()?.email).toBe('candidat@candidat.com');

    });


    it('does not restore a session when none was persisted', () => {

      const service = new AuthService();

      expect(service.isLoggedIn()).toBe(false);
      expect(service.getUser()).toBeNull();

    });

  });


  describe('logout', () => {

    it('clears both the in-memory user and the persisted session', () => {

      const service = new AuthService();
      service.login('candidat@candidat.com');

      service.logout();

      expect(service.isLoggedIn()).toBe(false);
      expect(service.getUser()).toBeNull();

      // Regression check for the sidebar-logout bug: after logout, a
      // fresh service instance (e.g. after a redirect + reload) must
      // NOT still find a persisted session.
      const serviceAfterLogout = new AuthService();
      expect(serviceAfterLogout.isLoggedIn()).toBe(false);

    });

  });

});
