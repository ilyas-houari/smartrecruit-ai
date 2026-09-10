import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { WorkMode } from '../../../../core/models/job.model';
import { Training, TrainingLevel } from '../../../../core/models/training.model';


/* ========================================
   FILTER
   ======================================== */

type RecommendationFilter =
  | 'ALL'
  | 'JOBS'
  | 'TRAINING';


/* ========================================
   MATCHING RESULT
   ======================================== */

interface MatchingResult {

  skillScore: number;

  experienceScore: number;

  educationScore: number;

  finalScore: number;

  missingSkills: string[];

}


/*
 * These are enriched view models — the shape a real
 * GET /api/recommendations/jobs and /trainings response
 * would return (job/training details joined with the
 * recommendation), not the raw job_recommendations /
 * training_recommendations table rows.
 */

/* ========================================
   RECOMMENDED JOB
   ======================================== */

interface RecommendedJob {

  id: number;

  jobId: number;

  title: string;

  companyName: string;

  companyInitial: string;

  location: string;

  workMode: WorkMode;

  reason: string;

  matchedSkills: string[];

  matchingResult: MatchingResult;

}


/* ========================================
   RECOMMENDED TRAINING
   ======================================== */

interface RecommendedTraining {

  id: number;

  training: Training;

  targetSkill: string;

  relevanceScore: number;

  reason: string;

}


@Component({
  selector: 'app-recommendations',

  imports: [
    RouterLink
  ],

  templateUrl: './recommendations.html',

  styleUrl: './recommendations.scss'
})
export class Recommendations {

  selectedFilter:
    RecommendationFilter = 'ALL';


  /* ========================================
     JOB RECOMMENDATIONS
     ======================================== */

  readonly jobRecommendations:
    RecommendedJob[] = [

      /* =====================================
         JOB 1
         ===================================== */

      {
        id: 1,

        jobId: 1,

        title:
          'Java Backend Developer',

        companyName:
          'Nexa Technologies',

        companyInitial:
          'N',

        location:
          'Casablanca',

        workMode:
          'HYBRID',

        reason:
          'Strong alignment with your Java, Spring Boot, MySQL and REST API experience.',

        matchedSkills: [
          'Java',
          'Spring Boot',
          'MySQL',
          'REST API'
        ],

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
            'Docker'
          ]

        }

      },


      /* =====================================
         JOB 2
         ===================================== */

      {
        id: 2,

        jobId: 2,

        title:
          'Full Stack Developer',

        companyName:
          'Digital Horizon',

        companyInitial:
          'D',

        location:
          'Rabat',

        workMode:
          'HYBRID',

        reason:
          'Your Angular and Java background matches both frontend and backend requirements.',

        matchedSkills: [
          'Angular',
          'Java',
          'REST API',
          'Git'
        ],

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
            'TypeScript'
          ]

        }

      },


      /* =====================================
         JOB 3
         ===================================== */

      {
        id: 3,

        jobId: 3,

        title:
          'Junior Software Engineer',

        companyName:
          'Atlas Systems',

        companyInitial:
          'A',

        location:
          'Marrakech',

        workMode:
          'ONSITE',

        reason:
          'Your education and backend development foundation make this a strong junior opportunity.',

        matchedSkills: [
          'Java',
          'SQL',
          'Git'
        ],

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
            'Testing'
          ]

        }

      }

    ];


  /* ========================================
     TRAINING RECOMMENDATIONS
     ======================================== */

  readonly trainingRecommendations:
    RecommendedTraining[] = [

      /* =====================================
         TRAINING 1
         ===================================== */

      {
        id: 1,

        targetSkill:
          'Docker',

        relevanceScore:
          96,

        reason:
          'Docker appears as a missing skill in one of your highest matching job opportunities.',

        training: {

          id: 1,

          title:
            'Docker Fundamentals',

          description:
            'Learn Docker basics, containers, images and essential development workflows.',

          provider:
            'SmartRecruit Learning',

          url:
            'https://example.com/docker-fundamentals',

          level:
            'BEGINNER',

          durationHours:
            6,

          isFree:
            true,

          status:
            'ACTIVE',

          createdAt:
            '2026-08-01T10:00:00',

          updatedAt:
            '2026-08-01T10:00:00'

        }

      },


      /* =====================================
         TRAINING 2
         ===================================== */

      {
        id: 2,

        targetSkill:
          'TypeScript',

        relevanceScore:
          89,

        reason:
          'Improving TypeScript can strengthen your compatibility with Full Stack and Angular roles.',

        training: {

          id: 2,

          title:
            'Advanced TypeScript',

          description:
            'Improve TypeScript knowledge with advanced typing, reusable patterns and modern application development.',

          provider:
            'SmartRecruit Learning',

          url:
            'https://example.com/advanced-typescript',

          level:
            'ADVANCED',

          durationHours:
            8,

          isFree:
            true,

          status:
            'ACTIVE',

          createdAt:
            '2026-08-03T10:00:00',

          updatedAt:
            '2026-08-03T10:00:00'

        }

      },


      /* =====================================
         TRAINING 3
         ===================================== */

      {
        id: 3,

        targetSkill:
          'Testing',

        relevanceScore:
          82,

        reason:
          'Testing is currently a skill gap for junior software engineering opportunities.',

        training: {

          id: 3,

          title:
            'Software Testing Essentials',

          description:
            'Learn software testing fundamentals, test planning and automated testing concepts.',

          provider:
            'SmartRecruit Learning',

          url:
            'https://example.com/software-testing',

          level:
            'BEGINNER',

          durationHours:
            5,

          isFree:
            true,

          status:
            'ACTIVE',

          createdAt:
            '2026-08-05T10:00:00',

          updatedAt:
            '2026-08-05T10:00:00'

        }

      }

    ];


  /* ========================================
     FILTER
     ======================================== */

  selectFilter(
    filter: RecommendationFilter
  ): void {

    this.selectedFilter =
      filter;

  }


  showJobs(): boolean {

    return (
      this.selectedFilter === 'ALL' ||
      this.selectedFilter === 'JOBS'
    );

  }


  showTraining(): boolean {

    return (
      this.selectedFilter === 'ALL' ||
      this.selectedFilter === 'TRAINING'
    );

  }


  /* ========================================
     DISPLAY HELPERS
     ======================================== */

  workModeLabel(
    mode: WorkMode
  ): string {

    switch (mode) {

      case 'ONSITE':
        return 'On-site';

      case 'REMOTE':
        return 'Remote';

      case 'HYBRID':
        return 'Hybrid';

    }

  }


  trainingLevelLabel(
    level: TrainingLevel
  ): string {

    switch (level) {

      case 'BEGINNER':
        return 'Beginner';

      case 'INTERMEDIATE':
        return 'Intermediate';

      case 'ADVANCED':
        return 'Advanced';

      case 'ALL_LEVELS':
        return 'All Levels';

    }

  }

}