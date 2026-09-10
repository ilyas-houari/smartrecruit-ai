import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


/* ========================================
   JOB STATUS
   ======================================== */

type JobStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'CLOSED'
  | 'ARCHIVED';


/* ========================================
   STAT CARD
   ======================================== */

interface StatCard {
  title: string;
  value: string;
  description: string;
  icon: string;
}


/* ========================================
   JOB POST
   ======================================== */

interface JobPost {
  id: number;

  title: string;

  location: string;

  applicants: number;

  status: JobStatus;
}


/* ========================================
   TOP CANDIDATE
   ======================================== */

interface Candidate {
  candidateId: number;

  applicationId: number;

  firstName: string;

  lastName: string;

  jobTitle: string;

  matchingResult: {
    finalScore: number;
  };
}


@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [
    RouterLink
  ],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.scss'
})
export class Dashboard {

  /* ========================================
     RECRUITER
     ======================================== */

  recruiterName =
    'Sarah Wilson';


  /* ========================================
     STATISTICS
     ======================================== */

  readonly stats:
    StatCard[] = [

      {
        title:
          'Published Jobs',

        value:
          '2',

        description:
          'Currently published',

        icon:
          'briefcase'
      },

      {
        title:
          'Candidates',

        value:
          '3',

        description:
          'Candidates reviewed',

        icon:
          'users'
      },

      {
        title:
          'Applications',

        value:
          '3',

        description:
          'Total applications',

        icon:
          'file'
      },

      {
        title:
          'Top Match',

        value:
          '87.5%',

        description:
          'Jamie Diaz',

        icon:
          'chart'
      }

    ];


  /* ========================================
     RECENT JOBS
     ======================================== */

  readonly recentJobs:
    JobPost[] = [

      {
        id:
          1,

        title:
          'Java Backend Developer',

        location:
          'Casablanca, Morocco',

        applicants:
          1,

        status:
          'PUBLISHED'
      },

      {
        id:
          2,

        title:
          'Angular Frontend Developer',

        location:
          'Rabat, Morocco',

        applicants:
          1,

        status:
          'PUBLISHED'
      },

      {
        id:
          3,

        title:
          'Junior Software Engineer',

        location:
          'Marrakech, Morocco',

        applicants:
          1,

        status:
          'CLOSED'
      }

    ];


  /* ========================================
     TOP CANDIDATES
     ======================================== */

  readonly topCandidates:
    Candidate[] = [

      {
        candidateId:
          1,

        applicationId:
          1,

        firstName:
          'Jamie',

        lastName:
          'Diaz',

        jobTitle:
          'Java Backend Developer',

        matchingResult: {
          finalScore: 87.5
        }
      },

      {
        candidateId:
          2,

        applicationId:
          2,

        firstName:
          'Sara',

        lastName:
          'Benali',

        jobTitle:
          'Angular Frontend Developer',

        matchingResult: {
          finalScore: 81
        }
      },

      {
        candidateId:
          3,

        applicationId:
          3,

        firstName:
          'Omar',

        lastName:
          'El Idrissi',

        jobTitle:
          'Junior Software Engineer',

        matchingResult: {
          finalScore: 76
        }
      }

    ];


  /* ========================================
     JOB STATUS LABEL
     ======================================== */

  jobStatusLabel(
    status: JobStatus
  ): string {

    switch (status) {

      case 'DRAFT':
        return 'Draft';

      case 'PUBLISHED':
        return 'Published';

      case 'CLOSED':
        return 'Closed';

      case 'ARCHIVED':
        return 'Archived';

    }

  }

}