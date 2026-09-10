import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


type WorkMode =
  | 'ONSITE'
  | 'REMOTE'
  | 'HYBRID';


interface RecommendedJob {
  id: number;
  title: string;
  companyName: string;
  location: string;
  workMode: WorkMode;
  skills: string[];
  matchingResult: {
    finalScore: number;
  };
}


interface RecentApplication {
  jobTitle: string;
  companyName: string;
  appliedAt: string;
  status: string;
}


@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  candidateName = 'Jamie';

  profileCompletion = 72;

  stats = {
    applications: 8,
    interviews: 2,
    recommendations: 14,
    profileViews: 27
  };

  recommendedJobs: RecommendedJob[] = [
    {
      id: 1,
      title: 'Java Backend Developer',
      companyName: 'Nexa Technologies',
      location: 'Casablanca, Morocco',
      workMode: 'HYBRID',
      matchingResult: { finalScore: 87.5 },
      skills: ['Java', 'Spring Boot', 'MySQL']
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      companyName: 'Digital Horizon',
      location: 'Rabat, Morocco',
      workMode: 'HYBRID',
      matchingResult: { finalScore: 81 },
      skills: ['Angular', 'Java', 'REST API']
    },
    {
      id: 3,
      title: 'Junior Software Engineer',
      companyName: 'Atlas Systems',
      location: 'Marrakech, Morocco',
      workMode: 'ONSITE',
      matchingResult: { finalScore: 76 },
      skills: ['Java', 'SQL', 'Git']
    }
  ];

  recentApplications: RecentApplication[] = [
    {
      jobTitle: 'Backend Developer',
      companyName: 'TechFlow',
      appliedAt: '18 Aug 2026',
      status: 'UNDER_REVIEW'
    },
    {
      jobTitle: 'Java Developer',
      companyName: 'CloudNova',
      appliedAt: '15 Aug 2026',
      status: 'SHORTLISTED'
    },
    {
      jobTitle: 'Software Engineer',
      companyName: 'InnovateLab',
      appliedAt: '10 Aug 2026',
      status: 'SUBMITTED'
    }
  ];


  workModeLabel(workMode: WorkMode): string {

    switch (workMode) {

      case 'ONSITE':
        return 'On-site';

      case 'REMOTE':
        return 'Remote';

      case 'HYBRID':
        return 'Hybrid';

    }

  }

}