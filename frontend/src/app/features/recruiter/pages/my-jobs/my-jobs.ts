import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JobService } from '../../../../core/services/job.service';
import {
  Job,
  JobStatus,
  WorkMode,
  ContractType
} from '../../../../core/models/job.model';



@Component({
  selector: 'app-my-jobs',

  standalone: true,

  imports: [],

  templateUrl: './my-jobs.html',

  styleUrl: './my-jobs.scss'
})
export class MyJobs implements OnInit {



  jobs: Job[] = [];



  constructor(
    private router: Router,

    private jobService: JobService
  ) {}





  ngOnInit(): void {


    this.loadJobs();


  }






  loadJobs(): void {


    /*
      Future:
      This will call Spring Boot API

      GET /api/jobs

    */


    this.jobService
      .getJobs()
      .subscribe({

        next: (jobs) => {

          this.jobs = jobs;

        },


        error: () => {


          // temporary mock data
          // until backend exists

          this.jobs = [

            {
              id: 1,

              title: 'Java Backend Developer',

              location: 'Casablanca, Morocco',

              workMode: 'HYBRID',

              contractType: 'CDI',

              applicants: 1,

              status: 'PUBLISHED',

              skills: []

            },


            {
              id: 2,

              title: 'Angular Frontend Developer',

              location: 'Rabat, Morocco',

              workMode: 'HYBRID',

              contractType: 'CDI',

              applicants: 1,

              status: 'PUBLISHED',

              skills: []

            },


            {
              id: 3,

              title: 'Junior Software Engineer',

              location: 'Marrakech, Morocco',

              workMode: 'REMOTE',

              contractType: 'CDD',

              applicants: 1,

              status: 'CLOSED',

              skills: []

            }

          ];


        }

      });


  }







  createJob(): void {


    this.router.navigate([

      '/recruiter/jobs/create'

    ]);


  }







  viewJob(id: number): void {


    this.router.navigate([

      '/recruiter/jobs',

      id

    ]);


  }







  editJob(id: number): void {


    this.router.navigate([

      '/recruiter/jobs',

      id,

      'edit'

    ]);


  }







  deleteJob(id: number): void {


    const job =

      this.jobs.find(

        item => item.id === id

      );



    if (!job) {

      return;

    }




    const confirmed =

      confirm(

        `Are you sure you want to delete "${job.title}"?`

      );




    if (!confirmed) {

      return;

    }





    this.jobService

      .deleteJob(id)

      .subscribe({

        next: () => {


          this.jobs =

            this.jobs.filter(

              item => item.id !== id

            );


        }


      });



  }







  statusLabel(status: JobStatus): string {


    switch(status) {


      case 'DRAFT':

        return 'Draft';


      case 'PUBLISHED':

        return 'Published';


      case 'CLOSED':

        return 'Closed';


      case 'ARCHIVED':

        return 'Archived';


    }


  }







  workModeLabel(workMode: WorkMode): string {


    switch(workMode) {


      case 'ONSITE':

        return 'On-site';


      case 'REMOTE':

        return 'Remote';


      case 'HYBRID':

        return 'Hybrid';


    }


  }







  contractTypeLabel(contractType: ContractType): string {


    switch(contractType) {


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


}