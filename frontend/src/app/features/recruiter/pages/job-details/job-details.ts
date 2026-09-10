import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


type JobStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'CLOSED'
  | 'ARCHIVED';


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


interface Job {

  id: number;

  title: string;

  location: string;

  workMode: WorkMode;

  contractType: ContractType;

  status: JobStatus;

  applicants: number;

  skills: string[];

  description: string;

  requiredExperienceYears: number;

  requiredEducationLevel: EducationLevel;

  salaryMin: number;

  salaryMax: number;

}



@Component({

  selector: 'app-job-details',

  standalone: true,

  imports: [],

  templateUrl: './job-details.html',

  styleUrl: './job-details.scss'

})

export class JobDetails {


  jobId = 0;


  job!: Job;


  successMessage = '';



  jobs: Job[] = [


    {

      id: 1,

      title: 'Java Backend Developer',

      location: 'Casablanca, Morocco',

      workMode: 'HYBRID',

      contractType: 'CDI',

      status: 'PUBLISHED',

      applicants: 24,

      requiredExperienceYears: 2,

      requiredEducationLevel: 'BAC_3',

      salaryMin: 9000,

      salaryMax: 14000,

      skills: [

        'Java',

        'Spring Boot',

        'MySQL',

        'REST API'

      ],

      description:

        'Looking for a backend developer to build scalable enterprise applications and REST APIs.'

    },


    {

      id: 2,

      title: 'Angular Frontend Developer',

      location: 'Rabat, Morocco',

      workMode: 'HYBRID',

      contractType: 'CDI',

      status: 'PUBLISHED',

      applicants: 18,

      requiredExperienceYears: 2,

      requiredEducationLevel: 'BAC_3',

      salaryMin: 8500,

      salaryMax: 13000,

      skills: [

        'Angular',

        'TypeScript',

        'HTML',

        'SCSS'

      ],

      description:

        'Looking for a frontend developer to build modern user interfaces using Angular and TypeScript.'

    },


    {

      id: 3,

      title: 'Junior Software Engineer',

      location: 'Marrakech, Morocco',

      workMode: 'REMOTE',

      contractType: 'CDD',

      status: 'CLOSED',

      applicants: 9,

      requiredExperienceYears: 1,

      requiredEducationLevel: 'BAC_3',

      salaryMin: 6000,

      salaryMax: 9000,

      skills: [

        'JavaScript',

        'SQL',

        'Git'

      ],

      description:

        'Junior position focused on software development and collaboration with engineering teams.'

    }


  ];





  constructor(

    private route: ActivatedRoute,

    private router: Router

  ) {


    this.jobId = Number(

      this.route.snapshot.paramMap.get('id')

    );



    this.job =

      this.jobs.find(

        job => job.id === this.jobId

      )

      ?? this.jobs[0];


  }





  get statusLabel(): string {


    switch(this.job.status){


      case 'DRAFT':

        return 'Draft';



      case 'PUBLISHED':

        return 'Published';



      case 'CLOSED':

        return 'Closed';



      case 'ARCHIVED':

        return 'Archived';



      default:

        return '';

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
        return 'CDI';

      case 'CDD':
        return 'CDD';

      case 'INTERNSHIP':
        return 'Internship';

      case 'FREELANCE':
        return 'Freelance';

      case 'PART_TIME':
        return 'Part-time';

      case 'OTHER':
        return 'Other';

    }

  }


  educationLevelLabel(level: EducationLevel): string {

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




  closeJob(): void {


    if(this.job.status !== 'PUBLISHED'){

      return;

    }


    this.job.status = 'CLOSED';


    this.successMessage =

      'Job closed successfully.';


  }





  archiveJob(): void {


    if(this.job.status !== 'CLOSED'){

      return;

    }


    this.job.status = 'ARCHIVED';


    this.successMessage =

      'Job archived successfully.';


  }





  editJob(): void {


    this.router.navigate([

      '/recruiter/jobs',

      this.job.id,

      'edit'

    ]);


  }





  viewApplications(): void {


    this.router.navigate(

      [

        '/recruiter/applications'

      ],

      {

        queryParams: {

          job: this.job.title

        }

      }

    );


  }





  backToJobs(): void {


    this.router.navigate([

      '/recruiter/jobs'

    ]);


  }



}
