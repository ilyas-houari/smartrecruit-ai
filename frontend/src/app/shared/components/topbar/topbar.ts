import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss'
})
export class Topbar {

  private readonly router = inject(Router);

  private readonly authService = inject(AuthService);


  get pageTitle(): string {

    const url = this.router.url;


    // =========================
    // RECRUITER
    // =========================

    if (/\/recruiter\/applications\/\d+/.test(url)) {
      return 'Application Review';
    }

    if (/\/recruiter\/candidates\/\d+/.test(url)) {
      return 'Candidate Profile';
    }

    if (/\/recruiter\/jobs\/\d+\/edit/.test(url)) {
      return 'Edit Job';
    }

    if (/\/recruiter\/jobs\/\d+/.test(url)) {
      return 'Job Details';
    }

    if (url.includes('/recruiter/jobs/create')) {
      return 'Create Job';
    }

    if (url.includes('/recruiter/create-job')) {
      return 'Create Job';
    }

    if (url.includes('/recruiter/ranking')) {
      return 'Candidate Ranking';
    }

    if (url.includes('/recruiter/applications')) {
      return 'Applications';
    }

    if (url.includes('/recruiter/candidates')) {
      return 'Candidates';
    }

    if (url.includes('/recruiter/jobs')) {
      return 'My Jobs';
    }

    if (url.includes('/recruiter/company')) {
      return 'Company Profile';
    }

    if (url.includes('/recruiter/dashboard')) {
      return 'Dashboard';
    }


    // =========================
    // CANDIDATE
    // =========================

    if (/\/candidate\/jobs\/\d+/.test(url)) {
      return 'Job Details';
    }

    if (url.includes('/candidate/profile')) {
      return 'Profile';
    }

    if (url.includes('/candidate/cv')) {
      return 'My CV';
    }

    if (url.includes('/candidate/jobs')) {
      return 'Job Offers';
    }

    if (url.includes('/candidate/applications')) {
      return 'Applications';
    }

    if (url.includes('/candidate/recommendations')) {
      return 'Recommendations';
    }

    if (url.includes('/candidate/dashboard')) {
      return 'Dashboard';
    }


    // =========================
    // ADMIN
    // =========================

    if (url.includes('/admin/users')) {
      return 'Users';
    }

    if (url.includes('/admin/companies')) {
      return 'Companies';
    }

    if (url.includes('/admin/jobs')) {
      return 'Jobs';
    }

    if (url.includes('/admin/trainings')) {
      return 'Trainings';
    }

    if (url.includes('/admin/dashboard')) {
      return 'Dashboard';
    }


    return 'Dashboard';
  }


  get userRole(): string {

    const role = this.authService.getUser()?.role;

    if (role === 'RECRUITER') {
      return 'Recruiter';
    }

    if (role === 'ADMIN') {
      return 'Administrator';
    }

    return 'Candidate';
  }


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


  get workspaceTitle(): string {

    const role = this.userRole;

    if (role === 'Recruiter') {
      return 'Recruiter workspace';
    }

    if (role === 'Administrator') {
      return 'Administration workspace';
    }

    return 'Candidate workspace';
  }

}