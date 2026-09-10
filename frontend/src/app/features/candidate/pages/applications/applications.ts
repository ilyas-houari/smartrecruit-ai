import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ApplicationService } from '../../../../core/services/application.service';


type ApplicationStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'SHORTLISTED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'WITHDRAWN';


type WorkMode =
  | 'ONSITE'
  | 'REMOTE'
  | 'HYBRID';


type ContractType =
  | 'CDI'
  | 'INTERNSHIP';


interface CandidateApplication {

  id: number;

  jobOfferId: number;

  jobTitle: string;

  companyName: string;

  companyInitial: string;

  location: string;

  workMode: WorkMode;

  contractType: ContractType;

  appliedAt: string;

  updatedAt: string;

  status: ApplicationStatus;

  matchingResult: {
    finalScore: number;
  };

  matchedSkills: string[];

}


@Component({
  selector: 'app-applications',

  imports: [
    FormsModule,
    RouterLink
  ],

  templateUrl: './applications.html',

  styleUrl: './applications.scss'
})
export class Applications {

  private readonly applicationService = inject(ApplicationService);

  selectedStatus:
    'ALL' | ApplicationStatus = 'ALL';

  searchTerm = '';

  withdrawError = '';


  applications: CandidateApplication[] = [

    {
      id: 1,

      jobOfferId: 1,

      jobTitle: 'Java Backend Developer',

      companyName: 'Nexa Technologies',

      companyInitial: 'N',

      location: 'Casablanca',

      workMode: 'HYBRID',

      contractType: 'CDI',

      appliedAt: '18 Aug 2026',

      updatedAt: '21 Aug 2026',

      status: 'UNDER_REVIEW',

      matchingResult: { finalScore: 87.5 },

      matchedSkills: [
        'Java',
        'Spring Boot',
        'MySQL'
      ]
    },


    {
      id: 2,

      jobOfferId: 2,

      jobTitle: 'Full Stack Developer',

      companyName: 'Digital Horizon',

      companyInitial: 'D',

      location: 'Rabat',

      workMode: 'HYBRID',

      contractType: 'CDI',

      appliedAt: '15 Aug 2026',

      updatedAt: '20 Aug 2026',

      status: 'SHORTLISTED',

      matchingResult: { finalScore: 81 },

      matchedSkills: [
        'Angular',
        'Java',
        'REST API'
      ]
    },


    {
      id: 3,

      jobOfferId: 3,

      jobTitle: 'Junior Software Engineer',

      companyName: 'Atlas Systems',

      companyInitial: 'A',

      location: 'Marrakech',

      workMode: 'ONSITE',

      contractType: 'CDI',

      appliedAt: '10 Aug 2026',

      updatedAt: '10 Aug 2026',

      status: 'SUBMITTED',

      matchingResult: { finalScore: 76 },

      matchedSkills: [
        'Java',
        'SQL',
        'Git'
      ]
    },


    {
      id: 4,

      jobOfferId: 4,

      jobTitle: 'Backend Developer Intern',

      companyName: 'CloudNova',

      companyInitial: 'C',

      location: 'Casablanca',

      workMode: 'ONSITE',

      contractType: 'INTERNSHIP',

      appliedAt: '04 Aug 2026',

      updatedAt: '16 Aug 2026',

      status: 'ACCEPTED',

      matchingResult: { finalScore: 72 },

      matchedSkills: [
        'Java',
        'Spring Boot',
        'SQL'
      ]
    },


    {
      id: 5,

      jobOfferId: 5,

      jobTitle: 'Angular Frontend Developer',

      companyName: 'PixelWorks',

      companyInitial: 'P',

      location: 'Rabat',

      workMode: 'REMOTE',

      contractType: 'CDI',

      appliedAt: '28 Jul 2026',

      updatedAt: '05 Aug 2026',

      status: 'REJECTED',

      matchingResult: { finalScore: 68 },

      matchedSkills: [
        'Angular',
        'TypeScript',
        'REST API'
      ]
    }

  ];


  get filteredApplications(): CandidateApplication[] {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();


    return this.applications.filter(
      application => {

        const matchesSearch =
          !search ||

          application.jobTitle
            .toLowerCase()
            .includes(search) ||

          application.companyName
            .toLowerCase()
            .includes(search);


        const matchesStatus =
          this.selectedStatus === 'ALL' ||

          application.status ===
            this.selectedStatus;


        return (
          matchesSearch &&
          matchesStatus
        );

      }
    );

  }


  get totalApplications(): number {

    return this.applications.length;

  }


  get activeApplications(): number {

    return this.applications.filter(
      application =>

        application.status ===
          'SUBMITTED' ||

        application.status ===
          'UNDER_REVIEW' ||

        application.status ===
          'SHORTLISTED'

    ).length;

  }


  get shortlistedApplications(): number {

    return this.applications.filter(
      application =>
        application.status ===
        'SHORTLISTED'
    ).length;

  }


  get acceptedApplications(): number {

    return this.applications.filter(
      application =>
        application.status ===
        'ACCEPTED'
    ).length;

  }


  clearFilters(): void {

    this.searchTerm = '';

    this.selectedStatus = 'ALL';

  }


  canWithdraw(
    application: CandidateApplication
  ): boolean {

    return (
      application.status === 'SUBMITTED' ||
      application.status === 'UNDER_REVIEW' ||
      application.status === 'SHORTLISTED'
    );

  }


  withdrawApplication(id: number): void {

    this.withdrawError = '';

    const application =
      this.applications.find(
        application =>
          application.id === id
      );


    if (!application) {
      return;
    }


    if (!this.canWithdraw(application)) {
      return;
    }


    const confirmed =
      confirm(
        'Are you sure you want to withdraw this application?'
      );


    if (!confirmed) {
      return;
    }


    /*
     * Later: PATCH /api/applications/{id}/withdraw
     */

    this.applicationService.withdraw(id).subscribe({

      next: () => {

        application.status = 'WITHDRAWN';

        application.updatedAt =
          '26 Aug 2026';

      },

      error: () => {

        this.withdrawError =
          'Unable to reach the server right now. The application was not withdrawn.';

      }

    });

  }


  getStatusLabel(
    status: ApplicationStatus
  ): string {

    switch (status) {

      case 'SUBMITTED':
        return 'Submitted';

      case 'UNDER_REVIEW':
        return 'Under review';

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


  contractTypeLabel(contractType: ContractType): string {

    switch (contractType) {

      case 'CDI':
        return 'Full-time';

      case 'INTERNSHIP':
        return 'Internship';

    }

  }

}
