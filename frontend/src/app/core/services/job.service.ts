import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Job } from '../models/job.model';


@Injectable({
  providedIn: 'root'
})
export class JobService {



  private jobs: Job[] = [

    {
      id: 1,

      title: 'Java Backend Developer',

      location: 'Casablanca, Morocco',

      workMode: 'HYBRID',

      contractType: 'CDI',

      status: 'PUBLISHED',

      applicants: 24,

      skills: [
        'Java',
        'Spring Boot',
        'MySQL'
      ]

    },


    {
      id: 2,

      title: 'Angular Frontend Developer',

      location: 'Rabat, Morocco',

      workMode: 'HYBRID',

      contractType: 'CDI',

      status: 'PUBLISHED',

      applicants: 18,

      skills: [
        'Angular',
        'TypeScript',
        'SCSS'
      ]

    },


    {
      id: 3,

      title: 'Junior Software Engineer',

      location: 'Marrakech, Morocco',

      workMode: 'REMOTE',

      contractType: 'CDD',

      status: 'CLOSED',

      applicants: 9,

      skills: [
        'JavaScript',
        'SQL',
        'Git'
      ]

    }

  ];





  getJobs(): Observable<Job[]> {


    return of(this.jobs);


  }







  getJobById(id: number): Observable<Job | undefined> {


    return of(

      this.jobs.find(

        job => job.id === id

      )

    );


  }







  createJob(job: Job): Observable<Job> {


    this.jobs.push(job);


    return of(job);


  }







  updateJob(job: Job): Observable<Job> {


    const index =

      this.jobs.findIndex(

        item => item.id === job.id

      );



    if (index !== -1) {

      this.jobs[index] = job;

    }


    return of(job);


  }







  deleteJob(id: number): Observable<void> {


    this.jobs =

      this.jobs.filter(

        job => job.id !== id

      );


    return of();


  }


}