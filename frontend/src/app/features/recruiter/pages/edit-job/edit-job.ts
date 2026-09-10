import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../../../core/services/job.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router';


/* ========================================
   OFFICIAL ENUMS
   ======================================== */

type WorkMode =
  | 'ONSITE'
  | 'REMOTE'
  | 'HYBRID';


type ContractType =
  | 'CDI'
  | 'CDD'
  | 'INTERNSHIP'
  | 'FREELANCE'
  | 'PART_TIME'
  | 'OTHER';


type EducationLevel =
  | 'NONE'
  | 'BAC'
  | 'BAC_2'
  | 'BAC_3'
  | 'MASTER'
  | 'ENGINEERING'
  | 'PHD'
  | 'OTHER';


type JobStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'CLOSED'
  | 'ARCHIVED';


type SkillLevel =
  | 'BEGINNER'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'EXPERT';


/* ========================================
   SKILL
   ======================================== */

interface SkillOption {

  id: number;

  name: string;

  category: string;

}


/* ========================================
   JOB SKILL
   ======================================== */

interface JobSkillRequirement {

  skillId: number;

  name: string;

  requiredLevel: SkillLevel;

  mandatory: boolean;

  weight: number | null;

}


/* ========================================
   JOB OFFER
   ======================================== */

interface JobOffer {

  id: number;

  title: string;

  description: string;

  location: string;

  workMode: WorkMode;

  contractType: ContractType;

  requiredExperienceYears: number;

  requiredEducationLevel: EducationLevel;

  salaryMin: number | null;

  salaryMax: number | null;

  deadline: string | null;

  status: JobStatus;

}


/* ========================================
   MOCK STORED JOB
   ======================================== */

interface MockStoredJob {

  job: JobOffer;

  jobSkills: JobSkillRequirement[];

}


@Component({
  selector: 'app-edit-job',

  standalone: true,

  imports: [
    FormsModule
  ],

  templateUrl: './edit-job.html',

  styleUrl: './edit-job.scss'
})
export class EditJob {

  /* ========================================
     ROUTE
     ======================================== */

  jobId = 0;


  /* ========================================
     MESSAGES
     ======================================== */

  successMessage = '';

  errorMessage = '';


  /* ========================================
     AVAILABLE SKILLS
     ======================================== */

  readonly skillCatalog: SkillOption[] = [

    {
      id: 1,
      name: 'Java',
      category: 'Programming Language'
    },

    {
      id: 2,
      name: 'Spring Boot',
      category: 'Backend'
    },

    {
      id: 3,
      name: 'Angular',
      category: 'Frontend'
    },

    {
      id: 4,
      name: 'TypeScript',
      category: 'Programming Language'
    },

    {
      id: 5,
      name: 'MySQL',
      category: 'Database'
    },

    {
      id: 6,
      name: 'Docker',
      category: 'DevOps'
    },

    {
      id: 7,
      name: 'Kubernetes',
      category: 'DevOps'
    },

    {
      id: 8,
      name: 'Git',
      category: 'Development Tool'
    },

    {
      id: 9,
      name: 'REST API',
      category: 'Backend'
    },

    {
      id: 10,
      name: 'Python',
      category: 'Programming Language'
    },

    {
      id: 11,
      name: 'FastAPI',
      category: 'Backend'
    },

    {
      id: 12,
      name: 'Testing',
      category: 'Software Engineering'
    },

    {
      id: 13,
      name: 'SQL',
      category: 'Database'
    },

    {
      id: 14,
      name: 'SCSS',
      category: 'Frontend'
    },

    {
      id: 15,
      name: 'Machine Learning',
      category: 'AI'
    }

  ];


  /* ========================================
     ADD SKILL FORM
     ======================================== */

  selectedSkillId: number | null =
    null;

  selectedRequiredLevel: SkillLevel =
    'INTERMEDIATE';

  selectedMandatory =
    true;

  selectedWeight: number | null =
    null;


  /* ========================================
     CURRENT JOB SKILLS
     ======================================== */

  jobSkills: JobSkillRequirement[] = [];


  /* ========================================
     MOCK STORED JOBS
     ======================================== */

  private readonly storedJobs:
    MockStoredJob[] = [

      /* =====================================
         JOB 1
         ===================================== */

      {
        job: {

          id: 1,

          title:
            'Java Backend Developer',

          description:
            'Looking for a backend developer to build scalable enterprise applications and REST APIs.',

          location:
            'Casablanca, Morocco',

          workMode:
            'HYBRID',

          contractType:
            'CDI',

          requiredExperienceYears:
            2,

          requiredEducationLevel:
            'BAC_3',

          salaryMin:
            9000,

          salaryMax:
            14000,

          deadline:
            '2026-09-30',

          status:
            'PUBLISHED'

        },

        jobSkills: [

          {
            skillId: 1,
            name: 'Java',
            requiredLevel: 'ADVANCED',
            mandatory: true,
            weight: 90
          },

          {
            skillId: 2,
            name: 'Spring Boot',
            requiredLevel: 'ADVANCED',
            mandatory: true,
            weight: 85
          },

          {
            skillId: 5,
            name: 'MySQL',
            requiredLevel: 'INTERMEDIATE',
            mandatory: true,
            weight: 70
          },

          {
            skillId: 9,
            name: 'REST API',
            requiredLevel: 'ADVANCED',
            mandatory: true,
            weight: 80
          }

        ]

      },


      /* =====================================
         JOB 2
         ===================================== */

      {
        job: {

          id: 2,

          title:
            'Angular Frontend Developer',

          description:
            'Looking for a frontend developer to build modern user interfaces using Angular and TypeScript.',

          location:
            'Rabat, Morocco',

          workMode:
            'HYBRID',

          contractType:
            'CDI',

          requiredExperienceYears:
            2,

          requiredEducationLevel:
            'BAC_3',

          salaryMin:
            8500,

          salaryMax:
            13000,

          deadline:
            '2026-10-15',

          status:
            'PUBLISHED'

        },

        jobSkills: [

          {
            skillId: 3,
            name: 'Angular',
            requiredLevel: 'ADVANCED',
            mandatory: true,
            weight: 90
          },

          {
            skillId: 4,
            name: 'TypeScript',
            requiredLevel: 'ADVANCED',
            mandatory: true,
            weight: 85
          },

          {
            skillId: 14,
            name: 'SCSS',
            requiredLevel: 'INTERMEDIATE',
            mandatory: false,
            weight: 45
          },

          {
            skillId: 9,
            name: 'REST API',
            requiredLevel: 'INTERMEDIATE',
            mandatory: true,
            weight: 65
          }

        ]

      },


      /* =====================================
         JOB 3
         ===================================== */

      {
        job: {

          id: 3,

          title:
            'Junior Software Engineer',

          description:
            'Junior position focused on software development and collaboration with engineering teams.',

          location:
            'Marrakech, Morocco',

          workMode:
            'REMOTE',

          contractType:
            'CDD',

          requiredExperienceYears:
            1,

          requiredEducationLevel:
            'BAC_3',

          salaryMin:
            6000,

          salaryMax:
            9000,

          deadline:
            null,

          status:
            'CLOSED'

        },

        jobSkills: [

          {
            skillId: 1,
            name: 'Java',
            requiredLevel: 'INTERMEDIATE',
            mandatory: true,
            weight: 70
          },

          {
            skillId: 13,
            name: 'SQL',
            requiredLevel: 'INTERMEDIATE',
            mandatory: true,
            weight: 60
          },

          {
            skillId: 8,
            name: 'Git',
            requiredLevel: 'BEGINNER',
            mandatory: true,
            weight: 40
          },

          {
            skillId: 12,
            name: 'Testing',
            requiredLevel: 'BEGINNER',
            mandatory: false,
            weight: 35
          }

        ]

      }

    ];


  /* ========================================
     CURRENT JOB
     ======================================== */

  job: JobOffer = {

    id:
      0,

    title:
      '',

    description:
      '',

    location:
      '',

    workMode:
      'HYBRID',

    contractType:
      'CDI',

    requiredExperienceYears:
      0,

    requiredEducationLevel:
      'BAC_3',

    salaryMin:
      null,

    salaryMax:
      null,

    deadline:
      null,

    status:
      'DRAFT'

  };


constructor(
  private route: ActivatedRoute,

  private router: Router,

  private jobService: JobService
) {

    this.jobId =
      Number(
        this.route
          .snapshot
          .paramMap
          .get('id')
      );


    this.loadJob();

  }


  /* ========================================
     AVAILABLE SKILLS
     ======================================== */

  get availableSkills():
    SkillOption[] {

    return this.skillCatalog.filter(
      skill =>
        !this.jobSkills.some(
          requirement =>
            requirement.skillId ===
            skill.id
        )
    );

  }


  /* ========================================
     ADD SKILL
     ======================================== */

  addSkillRequirement(): void {

    this.errorMessage = '';

    this.successMessage = '';


    if (
      this.selectedSkillId ===
      null
    ) {

      this.errorMessage =
        'Please select a skill.';

      return;

    }


    const skill =
      this.skillCatalog.find(
        item =>
          item.id ===
          this.selectedSkillId
      );


    if (!skill) {

      this.errorMessage =
        'The selected skill could not be found.';

      return;

    }


    const alreadyExists =
      this.jobSkills.some(
        requirement =>
          requirement.skillId ===
          skill.id
      );


    if (alreadyExists) {

      this.errorMessage =
        'This skill is already required for the job.';

      return;

    }


    if (
      this.selectedWeight !== null &&
      (
        this.selectedWeight < 0 ||
        this.selectedWeight > 100
      )
    ) {

      this.errorMessage =
        'Skill weight must be between 0 and 100.';

      return;

    }


    this.jobSkills.push({

      skillId:
        skill.id,

      name:
        skill.name,

      requiredLevel:
        this.selectedRequiredLevel,

      mandatory:
        this.selectedMandatory,

      weight:
        this.selectedWeight

    });


    this.resetSkillBuilder();

  }


  /* ========================================
     REMOVE SKILL
     ======================================== */

  removeSkillRequirement(
    skillId: number
  ): void {

    this.jobSkills =
      this.jobSkills.filter(
        requirement =>
          requirement.skillId !==
          skillId
      );

  }


  /* ========================================
     SAVE CHANGES
     ======================================== */

  saveChanges(): void {

    this.errorMessage = '';

    this.successMessage = '';


    if (
      !this.job.title.trim() ||
      !this.job.location.trim() ||
      !this.job.description.trim()
    ) {

      this.errorMessage =
        'Please complete the title, location and description.';

      return;

    }


    if (
      this.job.requiredExperienceYears <
      0
    ) {

      this.errorMessage =
        'Required experience cannot be negative.';

      return;

    }


    if (
      this.job.status ===
      'PUBLISHED' &&
      this.jobSkills.length ===
      0
    ) {

      this.errorMessage =
        'A published job must have at least one required skill.';

      return;

    }


    if (
      !this.validateSalary()
    ) {
      return;
    }


    if (
      !this.validateJobSkills()
    ) {
      return;
    }


    /*
     * Frontend mock.
     *
     * Later:
     *
     * PUT /api/jobs/{id}
     */

    this.successMessage =
      'Job updated successfully.';


    setTimeout(() => {

      this.router.navigate([
        '/recruiter/jobs'
      ]);

    }, 1200);

  }


  /* ========================================
     CANCEL
     ======================================== */

  cancel(): void {

    this.router.navigate([
      '/recruiter/jobs'
    ]);

  }


  /* ========================================
     LOAD JOB
     ======================================== */

  private loadJob(): void {

    const stored =
      this.storedJobs.find(
        item =>
          item.job.id ===
          this.jobId
      );


    if (!stored) {

      this.errorMessage =
        'The requested job could not be found.';

      return;

    }


    /*
     * Clone the job.
     */

    this.job = {
      ...stored.job
    };


    /*
     * Clone the JobSkill requirements.
     */

    this.jobSkills =
      stored.jobSkills.map(
        requirement => ({
          ...requirement
        })
      );

  }


  /* ========================================
     RESET SKILL BUILDER
     ======================================== */

  private resetSkillBuilder(): void {

    this.selectedSkillId =
      null;

    this.selectedRequiredLevel =
      'INTERMEDIATE';

    this.selectedMandatory =
      true;

    this.selectedWeight =
      null;

  }


  /* ========================================
     SALARY VALIDATION
     ======================================== */

  private validateSalary(): boolean {

    if (
      this.job.salaryMin !== null &&
      this.job.salaryMin < 0
    ) {

      this.errorMessage =
        'Minimum salary cannot be negative.';

      return false;

    }


    if (
      this.job.salaryMax !== null &&
      this.job.salaryMax < 0
    ) {

      this.errorMessage =
        'Maximum salary cannot be negative.';

      return false;

    }


    if (
      this.job.salaryMin !== null &&
      this.job.salaryMax !== null &&
      this.job.salaryMax <
        this.job.salaryMin
    ) {

      this.errorMessage =
        'Maximum salary cannot be lower than minimum salary.';

      return false;

    }


    return true;

  }


  /* ========================================
     JOB SKILL VALIDATION
     ======================================== */

  private validateJobSkills():
    boolean {

    for (
      const requirement
      of this.jobSkills
    ) {

      if (
        requirement.weight !== null &&
        (
          requirement.weight < 0 ||
          requirement.weight > 100
        )
      ) {

        this.errorMessage =
          `Weight for ${requirement.name} must be between 0 and 100.`;

        return false;

      }

    }


    return true;

  }

}