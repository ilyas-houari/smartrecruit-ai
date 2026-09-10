import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


type WorkMode =
  | 'ONSITE'
  | 'REMOTE'
  | 'HYBRID';


type ContractType =
  | 'CDI'
  | 'PART_TIME'
  | 'INTERNSHIP';


interface JobOffer {
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
  matchingResult: {
    finalScore: number;
  };
  description: string;
  skills: string[];
  featured?: boolean;
}

@Component({
  selector: 'app-jobs',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss'
})
export class Jobs {

  searchTerm = '';
  selectedLocation = 'ALL';
  selectedWorkMode: 'ALL' | WorkMode = 'ALL';
  selectedContractType: 'ALL' | ContractType = 'ALL';

  readonly jobs: JobOffer[] = [
    {
      id: 1,
      title: 'Java Backend Developer',
      companyName: 'Nexa Technologies',
      companyInitial: 'N',
      location: 'Casablanca',
      workMode: 'HYBRID',
      contractType: 'CDI',
      experience: '1–2 years',
      salary: '9K – 13K MAD',
      postedAt: '2 days ago',
      matchingResult: { finalScore: 87.5 },
      description:
        'Join our backend engineering team to build scalable APIs and business services using Java and Spring Boot.',
      skills: [
        'Java',
        'Spring Boot',
        'MySQL',
        'REST API'
      ],
      featured: true
    },

    {
      id: 2,
      title: 'Full Stack Developer',
      companyName: 'Digital Horizon',
      companyInitial: 'D',
      location: 'Rabat',
      workMode: 'HYBRID',
      contractType: 'CDI',
      experience: '1–3 years',
      salary: '10K – 14K MAD',
      postedAt: '3 days ago',
      matchingResult: { finalScore: 81 },
      description:
        'Work across Angular interfaces and Java backend services in a modern product development environment.',
      skills: [
        'Angular',
        'Java',
        'REST API',
        'Git'
      ]
    },

    {
      id: 3,
      title: 'Junior Software Engineer',
      companyName: 'Atlas Systems',
      companyInitial: 'A',
      location: 'Marrakech',
      workMode: 'ONSITE',
      contractType: 'CDI',
      experience: '0–2 years',
      salary: '7K – 10K MAD',
      postedAt: '4 days ago',
      matchingResult: { finalScore: 76 },
      description:
        'Start your software engineering career while contributing to business applications and internal platforms.',
      skills: [
        'Java',
        'SQL',
        'Git',
        'OOP'
      ]
    },

    {
      id: 4,
      title: 'Backend Developer Intern',
      companyName: 'CloudNova',
      companyInitial: 'C',
      location: 'Casablanca',
      workMode: 'ONSITE',
      contractType: 'INTERNSHIP',
      experience: 'Student / Graduate',
      salary: 'Paid internship',
      postedAt: '5 days ago',
      matchingResult: { finalScore: 72 },
      description:
        'A hands-on backend internship focused on APIs, databases and clean software engineering practices.',
      skills: [
        'Java',
        'Spring Boot',
        'SQL'
      ]
    },

    {
      id: 5,
      title: 'Angular Frontend Developer',
      companyName: 'PixelWorks',
      companyInitial: 'P',
      location: 'Rabat',
      workMode: 'REMOTE',
      contractType: 'CDI',
      experience: '1–2 years',
      salary: '8K – 12K MAD',
      postedAt: '1 week ago',
      matchingResult: { finalScore: 68 },
      description:
        'Build responsive web experiences with Angular and collaborate closely with product and backend teams.',
      skills: [
        'Angular',
        'TypeScript',
        'SCSS',
        'REST API'
      ]
    },

    {
      id: 6,
      title: 'Software Engineering Intern',
      companyName: 'InnovateLab',
      companyInitial: 'I',
      location: 'Tangier',
      workMode: 'HYBRID',
      contractType: 'INTERNSHIP',
      experience: 'Student',
      salary: 'Paid internship',
      postedAt: '1 week ago',
      matchingResult: { finalScore: 64 },
      description:
        'Learn modern software development through real product features, code reviews and collaborative engineering.',
      skills: [
        'Java',
        'Angular',
        'Git'
      ]
    }
  ];


  get filteredJobs(): JobOffer[] {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();

    return this.jobs.filter((job) => {

      const matchesSearch =
        !search ||
        job.title.toLowerCase().includes(search) ||
        job.companyName.toLowerCase().includes(search) ||
        job.skills.some(
          (skill) =>
            skill
              .toLowerCase()
              .includes(search)
        );

      const matchesLocation =
        this.selectedLocation === 'ALL' ||
        job.location === this.selectedLocation;

      const matchesWorkMode =
        this.selectedWorkMode === 'ALL' ||
        job.workMode === this.selectedWorkMode;

      const matchesContractType =
        this.selectedContractType === 'ALL' ||
        job.contractType === this.selectedContractType;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesWorkMode &&
        matchesContractType
      );
    });
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

      case 'PART_TIME':
        return 'Part-time';

      case 'INTERNSHIP':
        return 'Internship';

    }

  }


  clearFilters(): void {
    this.searchTerm = '';
    this.selectedLocation = 'ALL';
    this.selectedWorkMode = 'ALL';
    this.selectedContractType = 'ALL';
  }
}
