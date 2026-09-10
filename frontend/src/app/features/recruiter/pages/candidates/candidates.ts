import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


/* ========================================
   ENUMS
   ======================================== */

type CvStatus =
  | 'UPLOADED'
  | 'PROCESSING'
  | 'ANALYZED'
  | 'VALIDATED'
  | 'FAILED';


type EducationLevel =
  | 'NONE'
  | 'BAC'
  | 'BAC_2'
  | 'BAC_3'
  | 'MASTER'
  | 'ENGINEERING'
  | 'PHD'
  | 'OTHER';


/* ========================================
   MATCHING SUMMARY
   ======================================== */

interface MatchingSummary {

  applicationId: number;

  jobOfferId: number;

  jobTitle: string;

  finalScore: number;

  missingSkillsCount: number;

}


/* ========================================
   CANDIDATE LIST ITEM
   ======================================== */

interface Candidate {

  id: number;

  firstName: string;

  lastName: string;

  city: string;

  country: string;

  totalExperienceMonths: number;

  highestEducationLevel: EducationLevel;

  cvStatus: CvStatus;

  skills: string[];

  matchingResult: MatchingSummary;

}


@Component({
  selector: 'app-candidates',

  standalone: true,

  imports: [
    FormsModule,
    RouterLink
  ],

  templateUrl: './candidates.html',

  styleUrl: './candidates.scss'
})
export class Candidates {

  /* ========================================
     SEARCH
     ======================================== */

  searchTerm = '';


  /* ========================================
     CANDIDATES
     ======================================== */

  readonly candidates:
    Candidate[] = [

      /* =====================================
         CANDIDATE 1
         ===================================== */

      {
        id: 1,

        firstName:
          'Jamie',

        lastName:
          'Diaz',

        city:
          'Casablanca',

        country:
          'Morocco',

        totalExperienceMonths:
          24,

        highestEducationLevel:
          'BAC_3',

        cvStatus:
          'VALIDATED',

        skills: [
          'Java',
          'Spring Boot',
          'MySQL',
          'REST API',
          'Git'
        ],

        matchingResult: {

          applicationId:
            1,

          jobOfferId:
            1,

          jobTitle:
            'Java Backend Developer',

          finalScore:
            87.5,

          missingSkillsCount:
            1

        }

      },


      /* =====================================
         CANDIDATE 2
         ===================================== */

      {
        id: 2,

        firstName:
          'Sara',

        lastName:
          'Benali',

        city:
          'Rabat',

        country:
          'Morocco',

        totalExperienceMonths:
          20,

        highestEducationLevel:
          'BAC_3',

        cvStatus:
          'VALIDATED',

        skills: [
          'Angular',
          'Java',
          'REST API',
          'Git'
        ],

        matchingResult: {

          applicationId:
            2,

          jobOfferId:
            2,

          jobTitle:
            'Full Stack Developer',

          finalScore:
            81,

          missingSkillsCount:
            1

        }

      },


      /* =====================================
         CANDIDATE 3
         ===================================== */

      {
        id: 3,

        firstName:
          'Omar',

        lastName:
          'El Idrissi',

        city:
          'Marrakech',

        country:
          'Morocco',

        totalExperienceMonths:
          12,

        highestEducationLevel:
          'BAC_3',

        cvStatus:
          'ANALYZED',

        skills: [
          'Java',
          'SQL',
          'Git'
        ],

        matchingResult: {

          applicationId:
            3,

          jobOfferId:
            3,

          jobTitle:
            'Junior Software Engineer',

          finalScore:
            76,

          missingSkillsCount:
            1

        }

      }

    ];


  /* ========================================
     FILTERED CANDIDATES
     ======================================== */

  get filteredCandidates():
    Candidate[] {

    const term =
      this.searchTerm
        .trim()
        .toLowerCase();


    if (!term) {

      return this.candidates;

    }


    return this.candidates.filter(
      candidate => {

        const fullName =
          `${candidate.firstName} ${candidate.lastName}`
            .toLowerCase();


        const location =
          `${candidate.city} ${candidate.country}`
            .toLowerCase();


        const jobTitle =
          candidate
            .matchingResult
            .jobTitle
            .toLowerCase();


        const skills =
          candidate.skills
            .join(' ')
            .toLowerCase();


        return (
          fullName.includes(term) ||
          location.includes(term) ||
          jobTitle.includes(term) ||
          skills.includes(term)
        );

      }
    );

  }


  /* ========================================
     CV STATUS LABEL
     ======================================== */

  cvStatusLabel(
    status: CvStatus
  ): string {

    switch (status) {

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
     EDUCATION LEVEL LABEL
     ======================================== */

  educationLevelLabel(
    level: EducationLevel
  ): string {

    switch (level) {

      case 'NONE':
        return 'None';

      case 'BAC':
        return 'BAC';

      case 'BAC_2':
        return 'BAC +2';

      case 'BAC_3':
        return 'BAC +3';

      case 'MASTER':
        return 'Master';

      case 'ENGINEERING':
        return 'Engineering';

      case 'PHD':
        return 'PhD';

      case 'OTHER':
        return 'Other';

    }

  }

}