import { Component } from '@angular/core';

interface AdminStat {
  title: string;
  value: number;
  description: string;
}

interface RecentItem {
  title: string;
  type: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  stats: AdminStat[] = [
    {
      title: 'Users',
      value: 248,
      description: 'Registered platform users'
    },

    {
      title: 'Companies',
      value: 18,
      description: 'Companies on the platform'
    },

    {
      title: 'Jobs',
      value: 46,
      description: 'Total job offers'
    },

    {
      title: 'Trainings',
      value: 32,
      description: 'Available trainings'
    }
  ];


  recentItems: RecentItem[] = [
    {
      title: 'Nexa Technologies',
      type: 'Company',
      status: 'ACTIVE'
    },

    {
      title: 'Java Backend Developer',
      type: 'Job',
      status: 'PUBLISHED'
    },

    {
      title: 'Docker Fundamentals',
      type: 'Training',
      status: 'ACTIVE'
    },

    {
      title: 'Angular Frontend Developer',
      type: 'Job',
      status: 'PUBLISHED'
    }
  ];


  activeUsers = 231;

  inactiveUsers = 17;

  publishedJobs = 31;

  closedJobs = 11;

  draftJobs = 4;

}