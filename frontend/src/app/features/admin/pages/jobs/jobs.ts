import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


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


type JobStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'CLOSED'
  | 'ARCHIVED';


interface AdminJob {
  id: number;
  title: string;
  companyName: string;
  location: string;
  workMode: WorkMode;
  contractType: ContractType;
  status: JobStatus;
  applicants: number;
}


@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss'
})
export class Jobs {

  searchTerm = '';

  selectedStatus: 'ALL' | JobStatus = 'ALL';

  selectedWorkMode: 'ALL' | WorkMode = 'ALL';


  jobs: AdminJob[] = [

    {
      id: 1,
      title: 'Java Backend Developer',
      companyName: 'Nexa Technologies',
      location: 'Casablanca, Morocco',
      workMode: 'HYBRID',
      contractType: 'CDI',
      status: 'PUBLISHED',
      applicants: 24
    },

    {
      id: 2,
      title: 'Angular Frontend Developer',
      companyName: 'Atlas Digital',
      location: 'Rabat, Morocco',
      workMode: 'HYBRID',
      contractType: 'CDI',
      status: 'PUBLISHED',
      applicants: 18
    },

    {
      id: 3,
      title: 'Junior Software Engineer',
      companyName: 'Marrakech Solutions',
      location: 'Marrakech, Morocco',
      workMode: 'REMOTE',
      contractType: 'CDD',
      status: 'CLOSED',
      applicants: 9
    },

    {
      id: 4,
      title: 'Software Engineering Intern',
      companyName: 'North Africa Tech',
      location: 'Tangier, Morocco',
      workMode: 'ONSITE',
      contractType: 'INTERNSHIP',
      status: 'DRAFT',
      applicants: 0
    },

    {
      id: 5,
      title: 'DevOps Engineer',
      companyName: 'Nexa Technologies',
      location: 'Casablanca, Morocco',
      workMode: 'REMOTE',
      contractType: 'CDI',
      status: 'ARCHIVED',
      applicants: 15
    }

  ];


  get filteredJobs(): AdminJob[] {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();


    return this.jobs.filter(job => {

      const matchesSearch =
        job.title
          .toLowerCase()
          .includes(search) ||

        job.companyName
          .toLowerCase()
          .includes(search) ||

        job.location
          .toLowerCase()
          .includes(search);


      const matchesStatus =
        this.selectedStatus === 'ALL' ||
        job.status === this.selectedStatus;


      const matchesWorkMode =
        this.selectedWorkMode === 'ALL' ||
        job.workMode === this.selectedWorkMode;


      return (
        matchesSearch &&
        matchesStatus &&
        matchesWorkMode
      );

    });

  }


  get totalJobs(): number {
    return this.jobs.length;
  }


  get publishedJobs(): number {

    return this.jobs.filter(
      job => job.status === 'PUBLISHED'
    ).length;

  }


  get closedJobs(): number {

    return this.jobs.filter(
      job => job.status === 'CLOSED'
    ).length;

  }


  get draftJobs(): number {

    return this.jobs.filter(
      job => job.status === 'DRAFT'
    ).length;

  }


  get archivedJobs(): number {

    return this.jobs.filter(
      job => job.status === 'ARCHIVED'
    ).length;

  }


  closeJob(id: number): void {

    const job =
      this.jobs.find(
        job => job.id === id
      );

    if (!job) {
      return;
    }

    if (job.status !== 'PUBLISHED') {
      return;
    }

    job.status = 'CLOSED';

  }


  archiveJob(id: number): void {

    const job =
      this.jobs.find(
        job => job.id === id
      );

    if (!job) {
      return;
    }

    if (job.status !== 'CLOSED') {
      return;
    }

    job.status = 'ARCHIVED';

  }


  statusLabel(status: JobStatus): string {

    switch (status) {

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

    switch (workMode) {

      case 'ONSITE':
        return 'On-site';

      case 'REMOTE':
        return 'Remote';

      case 'HYBRID':
        return 'Hybrid';

    }

  }

}