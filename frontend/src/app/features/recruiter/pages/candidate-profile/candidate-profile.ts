import { Component } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';


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


type SkillLevel =
  | 'BEGINNER'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'EXPERT';


type MissingSkillImportance =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL';


/* ========================================
   CANDIDATE SKILL
   ======================================== */

interface CandidateSkill {
  skillId: number;
  name: string;
  level: SkillLevel;
}


/* ========================================
   EXPERIENCE
   ======================================== */

interface CandidateExperience {
  id: number;
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  durationMonths: number;
  description: string;
}


/* ========================================
   EDUCATION
   ======================================== */

interface CandidateEducation {
  id: number;
  degree: string;
  field: string;
  institution: string;
  startYear: number;
  endYear: number | null;
  level: EducationLevel;
}


/* ========================================
   MISSING SKILL
   ======================================== */

interface MissingSkill {
  skillId: number;
  name: string;
  importance: MissingSkillImportance;
}


/* ========================================
   MATCHING RESULT
   ======================================== */

interface MatchingResult {
  applicationId: number;
  jobOfferId: number;
  jobTitle: string;

  skillScore: number;
  experienceScore: number;
  educationScore: number;
  finalScore: number;

  missingSkills: MissingSkill[];

  explanation: string;
}


/* ========================================
   CANDIDATE
   ======================================== */

interface Candidate {
  id: number;

  firstName: string;
  lastName: string;

  city: string;
  country: string;

  email: string;
  phone: string;

  bio: string;

  totalExperienceMonths: number;

  highestEducationLevel: EducationLevel;

  cvStatus: CvStatus;

  candidateSkills: CandidateSkill[];

  experiences: CandidateExperience[];

  educations: CandidateEducation[];

  matchingResult: MatchingResult;
}


@Component({
  selector: 'app-candidate-profile',

  standalone: true,

  imports: [
    RouterLink
  ],

  templateUrl: './candidate-profile.html',

  styleUrl: './candidate-profile.scss'
})
export class CandidateProfile {

  /* ========================================
     ROUTE
     ======================================== */

  candidateId = 0;

  candidateNotFound = false;


  /* ========================================
     MOCK CANDIDATES
     ======================================== */

  private readonly candidates:
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

        email:
          'jamie.diaz@example.com',

        phone:
          '+212 6 12 34 56 78',

        bio:
          'Backend developer specialized in building scalable APIs and business applications using Java and Spring Boot.',

        totalExperienceMonths:
          24,

        highestEducationLevel:
          'BAC_3',

        cvStatus:
          'VALIDATED',

        candidateSkills: [

          {
            skillId: 1,
            name: 'Java',
            level: 'ADVANCED'
          },

          {
            skillId: 2,
            name: 'Spring Boot',
            level: 'ADVANCED'
          },

          {
            skillId: 5,
            name: 'MySQL',
            level: 'ADVANCED'
          },

          {
            skillId: 9,
            name: 'REST API',
            level: 'ADVANCED'
          },

          {
            skillId: 8,
            name: 'Git',
            level: 'INTERMEDIATE'
          }

        ],

        experiences: [

          {
            id: 1,

            jobTitle:
              'Backend Developer Intern',

            companyName:
              'Nexa Technologies',

            startDate:
              '2026-03-01',

            endDate:
              '2026-07-31',

            isCurrent:
              false,

            durationMonths:
              5,

            description:
              'Developed REST APIs using Java, Spring Boot and MySQL.'
          },

          {
            id: 2,

            jobTitle:
              'Web Development Intern',

            companyName:
              'Digital Horizon',

            startDate:
              '2025-07-01',

            endDate:
              '2025-09-30',

            isCurrent:
              false,

            durationMonths:
              3,

            description:
              'Built web interfaces and integrated REST services.'
          }

        ],

        educations: [

          {
            id: 1,

            degree:
              'Bachelor in Software Engineering',

            field:
              'Software Engineering',

            institution:
              'Faculty of Science and Technology',

            startYear:
              2023,

            endYear:
              2026,

            level:
              'BAC_3'
          }

        ],

        matchingResult: {

          applicationId:
            1,

          jobOfferId:
            1,

          jobTitle:
            'Java Backend Developer',

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
              name: 'Docker',
              importance: 'HIGH'
            }

          ],

          explanation:
            'Candidate matches most required technical skills and fully satisfies the experience and education requirements.'

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

        email:
          'sara.benali@example.com',

        phone:
          '+212 6 23 45 67 89',

        bio:
          'Full stack developer with experience in Angular, Java and REST API development.',

        totalExperienceMonths:
          20,

        highestEducationLevel:
          'BAC_3',

        cvStatus:
          'VALIDATED',

        candidateSkills: [

          {
            skillId: 3,
            name: 'Angular',
            level: 'ADVANCED'
          },

          {
            skillId: 1,
            name: 'Java',
            level: 'INTERMEDIATE'
          },

          {
            skillId: 9,
            name: 'REST API',
            level: 'ADVANCED'
          },

          {
            skillId: 8,
            name: 'Git',
            level: 'INTERMEDIATE'
          }

        ],

        experiences: [

          {
            id: 3,

            jobTitle:
              'Full Stack Developer Intern',

            companyName:
              'Digital Horizon',

            startDate:
              '2025-10-01',

            endDate:
              '2026-06-30',

            isCurrent:
              false,

            durationMonths:
              9,

            description:
              'Worked on Angular interfaces and Java REST services.'
          }

        ],

        educations: [

          {
            id: 2,

            degree:
              'Bachelor in Computer Science',

            field:
              'Computer Science',

            institution:
              'University of Rabat',

            startYear:
              2023,

            endYear:
              2026,

            level:
              'BAC_3'
          }

        ],

        matchingResult: {

          applicationId:
            2,

          jobOfferId:
            2,

          jobTitle:
            'Full Stack Developer',

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
              name: 'TypeScript',
              importance: 'MEDIUM'
            }

          ],

          explanation:
            'Candidate has strong frontend and backend alignment, with TypeScript identified as the main skill gap.'

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

        email:
          'omar.elidrissi@example.com',

        phone:
          '+212 6 34 56 78 90',

        bio:
          'Junior software engineer with a solid Java, SQL and Git foundation.',

        totalExperienceMonths:
          12,

        highestEducationLevel:
          'BAC_3',

        cvStatus:
          'ANALYZED',

        candidateSkills: [

          {
            skillId: 1,
            name: 'Java',
            level: 'INTERMEDIATE'
          },

          {
            skillId: 13,
            name: 'SQL',
            level: 'INTERMEDIATE'
          },

          {
            skillId: 8,
            name: 'Git',
            level: 'INTERMEDIATE'
          }

        ],

        experiences: [

          {
            id: 4,

            jobTitle:
              'Software Development Intern',

            companyName:
              'Atlas Systems',

            startDate:
              '2025-06-01',

            endDate:
              '2025-09-30',

            isCurrent:
              false,

            durationMonths:
              4,

            description:
              'Assisted with Java development, SQL queries and Git workflows.'
          }

        ],

        educations: [

          {
            id: 3,

            degree:
              'Bachelor in Software Engineering',

            field:
              'Software Engineering',

            institution:
              'University of Marrakech',

            startYear:
              2023,

            endYear:
              2026,

            level:
              'BAC_3'
          }

        ],

        matchingResult: {

          applicationId:
            3,

          jobOfferId:
            3,

          jobTitle:
            'Junior Software Engineer',

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
              name: 'Testing',
              importance: 'MEDIUM'
            }

          ],

          explanation:
            'Candidate has a good junior-level foundation but should improve software testing skills.'

        }

      }

    ];


  /* ========================================
     CURRENT CANDIDATE
     ======================================== */

  candidate: Candidate =
    this.candidates[0];


  constructor(
    private route: ActivatedRoute
  ) {

    this.candidateId =
      Number(
        this.route
          .snapshot
          .paramMap
          .get('id')
      );


    this.loadCandidate();

  }


  /* ========================================
     LOAD CANDIDATE
     ======================================== */

  private loadCandidate(): void {

    const selectedCandidate =
      this.candidates.find(
        candidate =>
          candidate.id ===
          this.candidateId
      );


    if (!selectedCandidate) {

      this.candidateNotFound =
        true;

      return;

    }


    this.candidate =
      selectedCandidate;

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
     EDUCATION LABEL
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


  /* ========================================
     SKILL LEVEL LABEL
     ======================================== */

  skillLevelLabel(
    level: SkillLevel
  ): string {

    switch (level) {

      case 'BEGINNER':
        return 'Beginner';

      case 'INTERMEDIATE':
        return 'Intermediate';

      case 'ADVANCED':
        return 'Advanced';

      case 'EXPERT':
        return 'Expert';

    }

  }

}