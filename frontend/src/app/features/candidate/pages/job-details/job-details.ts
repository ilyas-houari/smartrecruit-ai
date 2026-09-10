import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';


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


type WorkMode =
  | 'ONSITE'
  | 'REMOTE'
  | 'HYBRID';


type ContractType =
  | 'CDI'
  | 'INTERNSHIP';


/* ========================================
   JOB DETAILS
   ======================================== */

interface JobDetail {

  id: number;

  title: string;

  companyName: string;
  companyInitial: string;

  location: string;
  workMode: WorkMode;
  contractType: ContractType;

  experience: string;
  salary: string;
  postedAt: string;

  description: string;

  responsibilities: string[];
  requirements: string[];

  requiredSkills: string[];
  matchedSkills: string[];

  matchingResult: MatchingResult;

  companyDescription: string;
  companyIndustry: string;
  companySize: string;
  companyWebsite: string;

}


@Component({
  selector: 'app-job-details',

  imports: [
    RouterLink
  ],

  templateUrl: './job-details.html',

  styleUrl: './job-details.scss'
})
export class JobDetails {

  private readonly route =
    inject(ActivatedRoute);


  isApplying = false;

  hasApplied = false;


  /* ========================================
     MOCK JOBS
     ======================================== */

  readonly jobs: JobDetail[] = [

    /* ========================================
       JOB 1
       ======================================== */

    {
      id: 1,

      title:
        'Java Backend Developer',

      companyName:
        'Nexa Technologies',

      companyInitial:
        'N',

      location:
        'Casablanca, Morocco',

      workMode:
        'HYBRID',

      contractType:
        'CDI',

      experience:
        '1–2 years',

      salary:
        '9K – 13K MAD',

      postedAt:
        '2 days ago',

      description:
        'Nexa Technologies is looking for a Java Backend Developer to join its engineering team and contribute to scalable business applications and REST services.',

      responsibilities: [
        'Design and develop backend services using Java and Spring Boot.',
        'Build and maintain REST APIs for frontend and external integrations.',
        'Work with MySQL databases and optimize application queries.',
        'Collaborate with frontend developers and product teams.',
        'Participate in code reviews, testing and technical documentation.'
      ],

      requirements: [
        'Good knowledge of Java and object-oriented programming.',
        'Experience with Spring Boot and REST API development.',
        'Understanding of relational databases and SQL.',
        'Familiarity with Git and collaborative development workflows.',
        'Ability to work effectively within an agile engineering team.'
      ],

      requiredSkills: [
        'Java',
        'Spring Boot',
        'MySQL',
        'REST API',
        'Docker'
      ],

      matchedSkills: [
        'Java',
        'Spring Boot',
        'MySQL',
        'REST API'
      ],

      matchingResult: {

        skillScore: 75,

        experienceScore: 100,

        educationScore: 100,

        finalScore: 87.5,

        missingSkills: [
          'Docker'
        ]

      },

      companyDescription:
        'Nexa Technologies develops digital platforms and enterprise software solutions for companies across Morocco.',

      companyIndustry:
        'Software & Technology',

      companySize:
        '50–200 employees',

      companyWebsite:
        'www.nexa-technologies.example'
    },


    /* ========================================
       JOB 2
       ======================================== */

    {
      id: 2,

      title:
        'Full Stack Developer',

      companyName:
        'Digital Horizon',

      companyInitial:
        'D',

      location:
        'Rabat, Morocco',

      workMode:
        'HYBRID',

      contractType:
        'CDI',

      experience:
        '1–3 years',

      salary:
        '10K – 14K MAD',

      postedAt:
        '3 days ago',

      description:
        'Digital Horizon is seeking a Full Stack Developer to work across modern Angular interfaces and Java backend services.',

      responsibilities: [
        'Develop responsive frontend interfaces using Angular.',
        'Build backend services and REST APIs.',
        'Integrate frontend applications with backend services.',
        'Write maintainable and reusable application code.',
        'Collaborate with designers and engineering teams.'
      ],

      requirements: [
        'Experience with Angular and TypeScript.',
        'Knowledge of Java backend development.',
        'Experience consuming and building REST APIs.',
        'Understanding of Git workflows.',
        'Knowledge of relational databases.'
      ],

      requiredSkills: [
        'Angular',
        'TypeScript',
        'Java',
        'REST API',
        'Git'
      ],

      matchedSkills: [
        'Angular',
        'Java',
        'REST API',
        'Git'
      ],

      matchingResult: {

        skillScore: 82,

        experienceScore: 80,

        educationScore: 80,

        finalScore: 81,

        missingSkills: [
          'TypeScript'
        ]

      },

      companyDescription:
        'Digital Horizon builds web applications and digital products for growing organizations.',

      companyIndustry:
        'Digital Services',

      companySize:
        '20–100 employees',

      companyWebsite:
        'www.digital-horizon.example'
    },


    /* ========================================
       JOB 3
       ======================================== */

    {
      id: 3,

      title:
        'Junior Software Engineer',

      companyName:
        'Atlas Systems',

      companyInitial:
        'A',

      location:
        'Marrakech, Morocco',

      workMode:
        'ONSITE',

      contractType:
        'CDI',

      experience:
        '0–2 years',

      salary:
        '7K – 10K MAD',

      postedAt:
        '4 days ago',

      description:
        'Atlas Systems is hiring a Junior Software Engineer to contribute to business applications while developing strong engineering skills.',

      responsibilities: [
        'Develop and maintain application features.',
        'Write clean and maintainable Java code.',
        'Work with SQL databases.',
        'Fix software defects and improve existing features.',
        'Participate in team meetings and code reviews.'
      ],

      requirements: [
        'Knowledge of Java programming.',
        'Understanding of SQL databases.',
        'Basic knowledge of Git.',
        'Understanding of object-oriented programming.',
        'Strong motivation to learn and improve.'
      ],

      requiredSkills: [
        'Java',
        'SQL',
        'Git',
        'OOP',
        'Testing'
      ],

      matchedSkills: [
        'Java',
        'SQL',
        'Git',
        'OOP'
      ],

      matchingResult: {

        skillScore: 72,

        experienceScore: 80,

        educationScore: 80,

        finalScore: 76,

        missingSkills: [
          'Testing'
        ]

      },

      companyDescription:
        'Atlas Systems develops information systems and software solutions for Moroccan businesses.',

      companyIndustry:
        'Information Technology',

      companySize:
        '100–300 employees',

      companyWebsite:
        'www.atlas-systems.example'
    },


    /* ========================================
       JOB 4
       ======================================== */

    {
      id: 4,

      title:
        'Backend Developer Intern',

      companyName:
        'CloudNova',

      companyInitial:
        'C',

      location:
        'Casablanca, Morocco',

      workMode:
        'ONSITE',

      contractType:
        'INTERNSHIP',

      experience:
        'Student / Graduate',

      salary:
        'Paid internship',

      postedAt:
        '5 days ago',

      description:
        'CloudNova offers a backend development internship focused on APIs, databases and professional software development practices.',

      responsibilities: [
        'Assist in backend feature development.',
        'Build simple REST endpoints.',
        'Work with relational databases.',
        'Test and document application features.',
        'Participate in engineering team activities.'
      ],

      requirements: [
        'Basic Java knowledge.',
        'Basic Spring Boot knowledge.',
        'Understanding of SQL.',
        'Interest in backend development.',
        'Strong learning ability.'
      ],

      requiredSkills: [
        'Java',
        'Spring Boot',
        'SQL',
        'Git'
      ],

      matchedSkills: [
        'Java',
        'Spring Boot',
        'SQL',
        'Git'
      ],

      matchingResult: {

        skillScore: 80,

        experienceScore: 40,

        educationScore: 100,

        finalScore: 72,

        missingSkills: []

      },

      companyDescription:
        'CloudNova develops cloud-based platforms and business software products.',

      companyIndustry:
        'Cloud Software',

      companySize:
        '20–50 employees',

      companyWebsite:
        'www.cloudnova.example'
    },


    /* ========================================
       JOB 5
       ======================================== */

    {
      id: 5,

      title:
        'Angular Frontend Developer',

      companyName:
        'PixelWorks',

      companyInitial:
        'P',

      location:
        'Rabat, Morocco',

      workMode:
        'REMOTE',

      contractType:
        'CDI',

      experience:
        '1–2 years',

      salary:
        '8K – 12K MAD',

      postedAt:
        '1 week ago',

      description:
        'PixelWorks is looking for an Angular developer to create modern and responsive web interfaces.',

      responsibilities: [
        'Develop Angular application features.',
        'Create responsive and accessible interfaces.',
        'Integrate REST APIs.',
        'Work closely with UI/UX designers.',
        'Maintain reusable frontend components.'
      ],

      requirements: [
        'Angular development experience.',
        'Strong TypeScript knowledge.',
        'Knowledge of HTML and SCSS.',
        'REST API integration experience.',
        'Understanding of responsive design.'
      ],

      requiredSkills: [
        'Angular',
        'TypeScript',
        'SCSS',
        'REST API',
        'Responsive Design'
      ],

      matchedSkills: [
        'Angular',
        'REST API'
      ],

      matchingResult: {

        skillScore: 60,

        experienceScore: 60,

        educationScore: 100,

        finalScore: 68,

        missingSkills: [
          'TypeScript',
          'SCSS'
        ]

      },

      companyDescription:
        'PixelWorks creates modern digital experiences and frontend products.',

      companyIndustry:
        'Web & Design Technology',

      companySize:
        '10–50 employees',

      companyWebsite:
        'www.pixelworks.example'
    },


    /* ========================================
       JOB 6
       ======================================== */

    {
      id: 6,

      title:
        'Software Engineering Intern',

      companyName:
        'InnovateLab',

      companyInitial:
        'I',

      location:
        'Tangier, Morocco',

      workMode:
        'HYBRID',

      contractType:
        'INTERNSHIP',

      experience:
        'Student',

      salary:
        'Paid internship',

      postedAt:
        '1 week ago',

      description:
        'InnovateLab offers a software engineering internship where students contribute to real product development.',

      responsibilities: [
        'Assist developers with product features.',
        'Write and test application code.',
        'Participate in code reviews.',
        'Work with frontend and backend technologies.',
        'Learn professional engineering workflows.'
      ],

      requirements: [
        'Software engineering or computer science student.',
        'Basic programming knowledge.',
        'Basic Java or Angular knowledge.',
        'Understanding of Git.',
        'Strong motivation to learn.'
      ],

      requiredSkills: [
        'Java',
        'Angular',
        'Git',
        'Testing'
      ],

      matchedSkills: [
        'Java',
        'Angular',
        'Git'
      ],

      matchingResult: {

        skillScore: 60,

        experienceScore: 60,

        educationScore: 80,

        finalScore: 64,

        missingSkills: [
          'Testing'
        ]

      },

      companyDescription:
        'InnovateLab supports emerging software products and engineering innovation.',

      companyIndustry:
        'Technology Innovation',

      companySize:
        '10–30 employees',

      companyWebsite:
        'www.innovatelab.example'
    }

  ];


  /* ========================================
     CURRENT JOB
     ======================================== */

  readonly jobId =
    Number(
      this.route.snapshot.paramMap.get('id')
    );


  readonly job =
    this.jobs.find(
      job =>
        job.id === this.jobId
    ) ?? null;


  /* ========================================
     APPLY
     ======================================== */

  applyNow(): void {

    if (
      !this.job ||
      this.hasApplied ||
      this.isApplying
    ) {
      return;
    }


    this.isApplying = true;


    /*
     * Frontend mock only.
     *
     * Later:
     * Angular service
     *      ↓
     * Spring Boot
     *      ↓
     * POST /api/applications
     */


    setTimeout(() => {

      this.isApplying = false;

      this.hasApplied = true;

    }, 700);

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