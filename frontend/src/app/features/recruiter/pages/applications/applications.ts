import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';


type ApplicationStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'SHORTLISTED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'WITHDRAWN';


interface MatchingSummary {
  finalScore: number;
  missingSkillsCount: number;
}


interface Application {
  id: number;

  candidateId: number;
  candidateFirstName: string;
  candidateLastName: string;

  jobOfferId: number;
  jobTitle: string;

  totalExperienceMonths: number;

  status: ApplicationStatus;

  matchedSkills: string[];

  matchingResult: MatchingSummary;
}


@Component({
  selector: 'app-applications',

  standalone: true,

  imports: [
    FormsModule,
    RouterLink
  ],

  templateUrl: './applications.html',

  styleUrl: './applications.scss'
})
export class Applications {

  searchTerm = '';

  selectedStatus:
    'ALL' | ApplicationStatus =
    'ALL';

  selectedJob = '';


  applications: Application[] = [

    {
      id: 1,

      candidateId: 1,

      candidateFirstName:
        'Jamie',

      candidateLastName:
        'Diaz',

      jobOfferId: 1,

      jobTitle:
        'Java Backend Developer',

      totalExperienceMonths:
        24,

      status:
        'UNDER_REVIEW',

      matchedSkills: [
        'Java',
        'Spring Boot',
        'MySQL',
        'REST API'
      ],

      matchingResult: {
        finalScore: 87.5,
        missingSkillsCount: 1
      }
    },


    {
      id: 2,

      candidateId: 2,

      candidateFirstName:
        'Sara',

      candidateLastName:
        'Benali',

      jobOfferId: 2,

      jobTitle:
        'Angular Frontend Developer',

      totalExperienceMonths:
        20,

      status:
        'SHORTLISTED',

      matchedSkills: [
        'Angular',
        'REST API'
      ],

      matchingResult: {
        finalScore: 81,
        missingSkillsCount: 1
      }
    },


    {
      id: 3,

      candidateId: 3,

      candidateFirstName:
        'Omar',

      candidateLastName:
        'El Idrissi',

      jobOfferId: 3,

      jobTitle:
        'Junior Software Engineer',

      totalExperienceMonths:
        12,

      status:
        'SUBMITTED',

      matchedSkills: [
        'Java',
        'SQL',
        'Git'
      ],

      matchingResult: {
        finalScore: 76,
        missingSkillsCount: 1
      }
    }

  ];


  constructor(
    private route: ActivatedRoute
  ) {

    this.route
      .queryParams
      .subscribe(
        params => {

          this.selectedJob =
            params['job'] || '';

        }
      );

  }


  get filteredApplications():
    Application[] {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();


    const jobFilter =
      this.selectedJob
        .trim()
        .toLowerCase();


    return this.applications.filter(
      application => {

        const candidateName =
          `${application.candidateFirstName} ${application.candidateLastName}`
            .toLowerCase();


        const jobTitle =
          application
            .jobTitle
            .toLowerCase();


        const skills =
          application
            .matchedSkills
            .join(' ')
            .toLowerCase();


        const matchesSearch =
          !search ||
          candidateName.includes(search) ||
          jobTitle.includes(search) ||
          skills.includes(search);


        const matchesStatus =
          this.selectedStatus === 'ALL' ||
          application.status ===
            this.selectedStatus;


        const matchesJob =
          !jobFilter ||

          String(
            application.jobOfferId
          ) === jobFilter ||

          jobTitle === jobFilter;


        return (
          matchesSearch &&
          matchesStatus &&
          matchesJob
        );

      }
    );

  }


  statusLabel(
    status: ApplicationStatus
  ): string {

    switch (status) {

      case 'SUBMITTED':
        return 'Submitted';

      case 'UNDER_REVIEW':
        return 'Under Review';

      case 'SHORTLISTED':
        return 'Shortlisted';

      case 'ACCEPTED':
        return 'Accepted';

      case 'REJECTED':
        return 'Rejected';

      case 'WITHDRAWN':
        return 'Withdrawn';

    }

  }


  shortlist(
    id: number
  ): void {

    const application =
      this.applications.find(
        application =>
          application.id === id
      );


    if (!application) {
      return;
    }


    if (
      this.isFinalStatus(
        application.status
      )
    ) {
      return;
    }


    application.status =
      'SHORTLISTED';

  }


  reject(
    id: number
  ): void {

    const application =
      this.applications.find(
        application =>
          application.id === id
      );


    if (!application) {
      return;
    }


    if (
      this.isFinalStatus(
        application.status
      )
    ) {
      return;
    }


    application.status =
      'REJECTED';

  }


  private isFinalStatus(
    status: ApplicationStatus
  ): boolean {

    return (
      status === 'ACCEPTED' ||
      status === 'REJECTED' ||
      status === 'WITHDRAWN'
    );

  }

}