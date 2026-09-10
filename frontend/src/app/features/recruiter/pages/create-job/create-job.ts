import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../../../../core/services/job.service';

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

  /*
   * These are the important JobSkill
   * contract fields.
   */

  skillId: number;

  requiredLevel: SkillLevel;

  mandatory: boolean;

  weight: number | null;


  /*
   * Frontend display helper only.
   *
   * The database relation uses skillId.
   */

  name: string;

}


/* ========================================
   JOB OFFER
   ======================================== */

interface JobOffer {

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


  /*
   * TEMPORARY compatibility field.
   *
   * The real structured requirements are
   * stored in jobSkills below.
   *
   * We will remove this after updating
   * create-job.html.
   */

  skills: string[];

}


@Component({
  selector: 'app-create-job',

  standalone: true,

  imports: [
    FormsModule
  ],

  templateUrl: './create-job.html',

  styleUrl: './create-job.scss'
})
export class CreateJob {

  /* ========================================
     MESSAGES
     ======================================== */

  successMessage = '';

  errorMessage = '';


  /* ========================================
     TEMPORARY OLD SKILLS INPUT
     ======================================== */

  /*
   * We keep this only so the current HTML
   * continues compiling.
   *
   * The next step replaces the comma-separated
   * skills box with a proper JobSkill editor.
   */

  skillsInput = '';


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
     NEW SKILL FORM
     ======================================== */

  selectedSkillId: number | null = null;

  selectedRequiredLevel: SkillLevel =
    'INTERMEDIATE';

  selectedMandatory = true;

  selectedWeight: number | null =
    null;


  /* ========================================
     STRUCTURED JOB SKILLS
     ======================================== */

  jobSkills: JobSkillRequirement[] = [];


  /* ========================================
     JOB
     ======================================== */

  job: JobOffer = {

    title: '',

    description: '',

    location: '',

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
      'DRAFT',

    skills:
      []

  };

constructor(

  private router: Router,

  private jobService: JobService

) {}


  /* ========================================
     AVAILABLE SKILLS
     ======================================== */

  get availableSkills(): SkillOption[] {

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
     ADD JOB SKILL
     ======================================== */

  addSkillRequirement(): void {

    this.errorMessage = '';
    this.successMessage = '';


    if (
      this.selectedSkillId === null
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


    const alreadyAdded =
      this.jobSkills.some(
        requirement =>
          requirement.skillId ===
          skill.id
      );


    if (alreadyAdded) {

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


    this.syncLegacySkillNames();


    /*
     * Reset the small Add Skill form.
     */

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
     REMOVE JOB SKILL
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


    this.syncLegacySkillNames();

  }


  /* ========================================
     CHANGE SKILL LEVEL
     ======================================== */

  updateSkillLevel(
    skillId: number,
    level: SkillLevel
  ): void {

    const requirement =
      this.jobSkills.find(
        item =>
          item.skillId ===
          skillId
      );


    if (!requirement) {
      return;
    }


    requirement.requiredLevel =
      level;

  }


  /* ========================================
     CHANGE MANDATORY
     ======================================== */

  updateSkillMandatory(
    skillId: number,
    mandatory: boolean
  ): void {

    const requirement =
      this.jobSkills.find(
        item =>
          item.skillId ===
          skillId
      );


    if (!requirement) {
      return;
    }


    requirement.mandatory =
      mandatory;

  }


  /* ========================================
     CHANGE WEIGHT
     ======================================== */

  updateSkillWeight(
    skillId: number,
    weight: number | null
  ): void {

    const requirement =
      this.jobSkills.find(
        item =>
          item.skillId ===
          skillId
      );


    if (!requirement) {
      return;
    }


    requirement.weight =
      weight;

  }


  /* ========================================
     SAVE DRAFT
     ======================================== */

  saveDraft(): void {

    this.errorMessage = '';

    this.successMessage = '';


    /*
     * Temporary:
     * support the old comma-separated HTML
     * until the next step.
     */

    this.syncLegacySkillsInput();


    if (
      !this.job.title.trim()
    ) {

      this.errorMessage =
        'Please enter a job title.';

      return;

    }


    if (
      this.job.requiredExperienceYears < 0
    ) {

      this.errorMessage =
        'Required experience cannot be negative.';

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


this.job.status = 'DRAFT';


const draftJob = {

  id: Date.now(),

  title: this.job.title,

  description: this.job.description,

  location: this.job.location,

  workMode: this.job.workMode,

  contractType: this.job.contractType,

  applicants: 0,

  status: this.job.status,

  skills: this.job.skills

};



this.jobService
  .createJob(draftJob)
  .subscribe({

    next: () => {

      this.successMessage =
        'Job saved as draft successfully.';

    },


    error: () => {

      this.errorMessage =
        'Unable to save draft.';

    }

  });

  }


  /* ========================================
     PUBLISH
     ======================================== */

  publishJob(): void {

    this.errorMessage = '';

    this.successMessage = '';


    /*
     * Temporary compatibility with the
     * existing skillsInput field.
     */

    this.syncLegacySkillsInput();


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
      this.job.requiredExperienceYears < 0
    ) {

      this.errorMessage =
        'Required experience cannot be negative.';

      return;

    }


    /*
     * Official business rule:
     *
     * A PUBLISHED job requires at least
     * one JobSkill.
     */

    if (
      this.jobSkills.length === 0
    ) {

      this.errorMessage =
        'Add at least one required skill before publishing.';

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


this.job.status = 'PUBLISHED';



const newJob = {

  id: Date.now(),

  title: this.job.title,

  description: this.job.description,

  location: this.job.location,

  workMode: this.job.workMode,

  contractType: this.job.contractType,

  applicants: 0,

  status: this.job.status,

  skills: this.job.skills

};



this.jobService
  .createJob(newJob)
  .subscribe({

    next: () => {


      this.successMessage =
        'Job published successfully.';



      setTimeout(() => {


        this.router.navigate([

          '/recruiter/jobs'

        ]);


      }, 1200);



    },


    error: () => {


      this.errorMessage =
        'Unable to create job.';


    }

  });


    /*
     * Frontend mock only.
     *
     * Later this will become:
     *
     * Angular
     *    ↓
     * POST /api/jobs
     *    ↓
     * Spring Boot
     */

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

  private validateJobSkills(): boolean {

    for (
      const requirement of this.jobSkills
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


  /* ========================================
     TEMPORARY LEGACY INPUT
     ======================================== */

  private syncLegacySkillsInput(): void {

    const value =
      this.skillsInput.trim();


    /*
     * If the old input is empty, do not
     * destroy requirements added through
     * the new structured editor.
     */

    if (!value) {

      this.syncLegacySkillNames();

      return;

    }


    const skillNames =
      value
        .split(',')
        .map(
          name =>
            name.trim()
        )
        .filter(
          name =>
            name.length > 0
        );


    for (
      const skillName of skillNames
    ) {

      const existing =
        this.findCatalogSkillByName(
          skillName
        );


      if (!existing) {

        /*
         * The old free-text field cannot
         * provide a reliable backend skillId.
         *
         * We simply leave unknown values out.
         * The next HTML step replaces free text
         * with the skill catalog selector.
         */

        continue;

      }


      const alreadyAdded =
        this.jobSkills.some(
          requirement =>
            requirement.skillId ===
            existing.id
        );


      if (alreadyAdded) {
        continue;
      }


      this.jobSkills.push({

        skillId:
          existing.id,

        name:
          existing.name,

        requiredLevel:
          'INTERMEDIATE',

        mandatory:
          true,

        weight:
          null

      });

    }


    this.syncLegacySkillNames();

  }


  /* ========================================
     CATALOG LOOKUP
     ======================================== */

  private findCatalogSkillByName(
    value: string
  ): SkillOption | undefined {

    const normalizedValue =
      this.normalizeSkillName(
        value
      );


    return this.skillCatalog.find(
      skill =>
        this.normalizeSkillName(
          skill.name
        ) ===
        normalizedValue
    );

  }


  private normalizeSkillName(
    value: string
  ): string {

    return value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ');

  }


  /* ========================================
     OLD HTML COMPATIBILITY
     ======================================== */

  private syncLegacySkillNames(): void {

    this.job.skills =
      this.jobSkills.map(
        requirement =>
          requirement.name
      );

  }

}