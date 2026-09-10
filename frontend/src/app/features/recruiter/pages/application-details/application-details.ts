import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { ApplicationService } from '../../../../core/services/application.service';


/* ========================================
   APPLICATION STATUS
   ======================================== */

type ApplicationStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'SHORTLISTED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'WITHDRAWN';


/* ========================================
   CV STATUS
   ======================================== */

type CvStatus =
  | 'UPLOADED'
  | 'PROCESSING'
  | 'ANALYZED'
  | 'VALIDATED'
  | 'FAILED';


/* ========================================
   MISSING SKILL
   ======================================== */

interface MissingSkill {
  skillId: number;
  name: string;
}


/* ========================================
   MATCHING RESULT
   ======================================== */

interface MatchingResult {
  skillScore: number;

  experienceScore: number;

  educationScore: number;

  finalScore: number;

  missingSkills: MissingSkill[];

  explanation: string;
}


/* ========================================
   APPLICATION
   ======================================== */

interface Application {
  id: number;

  candidateId: number;

  candidateFirstName: string;

  candidateLastName: string;

  jobOfferId: number;

  jobTitle: string;

  totalExperienceMonths: number;

  status: ApplicationStatus;

  cvStatus: CvStatus;

  matchedSkills: string[];

  summary: string;

  matchingResult: MatchingResult;
}


@Component({
  selector: 'app-application-details',

  standalone: true,

  imports: [
    RouterLink
  ],

  templateUrl: './application-details.html',

  styleUrl: './application-details.scss'
})
export class ApplicationDetails {

  /* ========================================
     ROUTE
     ======================================== */

  private readonly applicationService = inject(ApplicationService);


  applicationId = 0;

  applicationNotFound = false;

  statusUpdateError = '';


  /* ========================================
     MOCK APPLICATIONS
     ======================================== */

  private readonly applications:
    Application[] = [

      /* =====================================
         APPLICATION 1
         ===================================== */

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

        cvStatus:
          'VALIDATED',

        matchedSkills: [
          'Java',
          'Spring Boot',
          'MySQL',
          'REST API'
        ],

        summary:
          'Backend developer experienced in building scalable APIs and enterprise applications using Java and Spring Boot.',

        matchingResult: {

          skillScore:
            75,

          experienceScore:
            100,

          educationScore:
            100,

          finalScore:
            87.5,

          missingSkills: [
            {
              skillId: 6,
              name: 'Docker'
            }
          ],

          explanation:
            'Candidate matches most required technical skills and fully satisfies the experience and education requirements.'

        }

      },


      /* =====================================
         APPLICATION 2
         ===================================== */

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

        cvStatus:
          'VALIDATED',

        matchedSkills: [
          'Angular',
          'REST API'
        ],

        summary:
          'Frontend developer with experience building modern Angular interfaces and integrating REST APIs.',

        matchingResult: {

          skillScore:
            82,

          experienceScore:
            80,

          educationScore:
            80,

          finalScore:
            81,

          missingSkills: [
            {
              skillId: 4,
              name: 'TypeScript'
            }
          ],

          explanation:
            'Candidate has strong Angular and REST API experience, with TypeScript identified as the main required skill gap.'

        }

      },


      /* =====================================
         APPLICATION 3
         ===================================== */

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

        cvStatus:
          'ANALYZED',

        matchedSkills: [
          'Java',
          'SQL',
          'Git'
        ],

        summary:
          'Junior software engineer with a solid foundation in Java, SQL and collaborative Git workflows.',

        matchingResult: {

          skillScore:
            72,

          experienceScore:
            80,

          educationScore:
            80,

          finalScore:
            76,

          missingSkills: [
            {
              skillId: 12,
              name: 'Testing'
            }
          ],

          explanation:
            'Candidate has a good junior-level technical foundation but should strengthen software testing skills.'

        }

      }

    ];


  /* ========================================
     CURRENT APPLICATION
     ======================================== */

  application: Application =
    this.applications[0];


  constructor(
    private route: ActivatedRoute
  ) {

    this.applicationId =
      Number(
        this.route
          .snapshot
          .paramMap
          .get('id')
      );


    this.loadApplication();

  }


  /* ========================================
     LOAD APPLICATION
     ======================================== */

  private loadApplication(): void {

    const selectedApplication =
      this.applications.find(
        application =>
          application.id ===
          this.applicationId
      );


    if (!selectedApplication) {

      this.applicationNotFound =
        true;

      return;

    }


    this.application =
      selectedApplication;

  }


  /* ========================================
     APPLICATION STATUS LABEL
     ======================================== */

  get statusLabel(): string {

    switch (
      this.application.status
    ) {

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


  /* ========================================
     CV STATUS LABEL
     ======================================== */

  get cvStatusLabel(): string {

    switch (
      this.application.cvStatus
    ) {

      case 'UPLOADED':
        return 'Uploaded';

      case 'PROCESSING':
        return 'Processing';

      case 'ANALYZED':
        return 'Analyzed';

      case 'VALIDATED':
        return 'Validated';

      case 'FAILED':
        return 'Failed';

    }

  }


  /* ========================================
     FINAL STATUS
     ======================================== */

  get isFinalStatus(): boolean {

    return (
      this.application.status === 'ACCEPTED' ||
      this.application.status === 'REJECTED' ||
      this.application.status === 'WITHDRAWN'
    );

  }


  /* ========================================
     MARK UNDER REVIEW
     ======================================== */

  markUnderReview(): void {

    if (
      this.isFinalStatus
    ) {
      return;
    }


    this.applyStatus('UNDER_REVIEW');

  }


  /* ========================================
     SHORTLIST
     ======================================== */

  shortlist(): void {

    if (
      this.isFinalStatus
    ) {
      return;
    }


    this.applyStatus('SHORTLISTED');

  }


  /* ========================================
     ACCEPT
     ======================================== */

  accept(): void {

    if (
      this.application.status === 'REJECTED' ||
      this.application.status === 'WITHDRAWN'
    ) {
      return;
    }


    this.applyStatus('ACCEPTED');

  }


  /* ========================================
     REJECT
     ======================================== */

  reject(): void {

    if (
      this.application.status === 'ACCEPTED' ||
      this.application.status === 'WITHDRAWN'
    ) {
      return;
    }


    this.applyStatus('REJECTED');

  }


  /* ========================================
     APPLY STATUS
     Later: PATCH /api/applications/{id}/status
     ======================================== */

  private applyStatus(
    status: ApplicationStatus
  ): void {

    this.statusUpdateError = '';

    this.applicationService
      .updateStatus(this.applicationId, status)
      .subscribe({

        next: () => {

          this.application.status = status;

        },

        error: () => {

          this.statusUpdateError =
            'Unable to reach the server right now. The status was not updated.';

        }

      });

  }

}