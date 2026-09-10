import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';


interface MenuItem {
  label: string;
  icon: string;
  route: string;
}


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {

  private readonly authService = inject(AuthService);

  collapsed = false;


  constructor(
    private router: Router
  ) {}


  // ================================
  // CANDIDATE MENU
  // ================================

  candidateMenu: MenuItem[] = [

    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/candidate/dashboard'
    },

    {
      label: 'Profile',
      icon: 'user',
      route: '/candidate/profile'
    },

    {
      label: 'My CV',
      icon: 'file',
      route: '/candidate/cv'
    },

    {
      label: 'Jobs',
      icon: 'briefcase',
      route: '/candidate/jobs'
    },

    {
      label: 'Applications',
      icon: 'check',
      route: '/candidate/applications'
    },

    {
      label: 'Recommendations',
      icon: 'spark',
      route: '/candidate/recommendations'
    }

  ];


  // ================================
  // RECRUITER MENU
  // ================================

  recruiterMenu: MenuItem[] = [

    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/recruiter/dashboard'
    },

    {
      label: 'Company Profile',
      icon: 'building',
      route: '/recruiter/company'
    },

    {
      label: 'Create Job',
      icon: 'plus',
      route: '/recruiter/jobs/create'
    },

    {
      label: 'My Jobs',
      icon: 'briefcase',
      route: '/recruiter/jobs'
    },

    {
      label: 'Candidates',
      icon: 'users',
      route: '/recruiter/candidates'
    },

    {
      label: 'Applications',
      icon: 'users',
      route: '/recruiter/applications'
    },

    {
      label: 'Ranking',
      icon: 'spark',
      route: '/recruiter/ranking'
    }

  ];


  // ================================
  // ADMIN MENU
  // ================================

  adminMenu: MenuItem[] = [

    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/admin/dashboard'
    },

    {
      label: 'Users',
      icon: 'users',
      route: '/admin/users'
    },

    {
      label: 'Companies',
      icon: 'building',
      route: '/admin/companies'
    },

    {
      label: 'Jobs',
      icon: 'briefcase',
      route: '/admin/jobs'
    },

    {
      label: 'Trainings',
      icon: 'file',
      route: '/admin/trainings'
    }

  ];


  // ================================
  // ROLE (from the authenticated session)
  // ================================

  get role(): 'candidate' | 'recruiter' | 'admin' {

    const userRole = this.authService.getUser()?.role;

    if (userRole === 'RECRUITER') {
      return 'recruiter';
    }

    if (userRole === 'ADMIN') {
      return 'admin';
    }

    return 'candidate';

  }


  // ================================
  // CURRENT MENU
  // ================================

  get menuItems(): MenuItem[] {

    if (this.role === 'recruiter') {
      return this.recruiterMenu;
    }

    if (this.role === 'admin') {
      return this.adminMenu;
    }

    return this.candidateMenu;
  }


  // ================================
  // USER INFORMATION
  // ================================

  get userName(): string {

    const user = this.authService.getUser();

    if (!user) {
      return 'Guest';
    }

    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }

    return user.email;

  }


  get avatarText(): string {

    return this.userName
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  }


  // ================================
  // SIDEBAR
  // ================================

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }


  // ================================
  // LOGOUT
  // ================================

  logout(): void {

    this.authService.logout();

    this.router.navigate([
      '/login'
    ]);

  }

}
