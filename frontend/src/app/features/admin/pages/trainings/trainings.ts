import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


type TrainingLevel =
  | 'BEGINNER'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'ALL_LEVELS';


type TrainingStatus =
  | 'ACTIVE'
  | 'INACTIVE';


interface Training {
  id: number;
  title: string;
  description: string;
  provider: string;
  url: string | null;
  level: TrainingLevel;
  durationHours: number;
  isFree: boolean;
  status: TrainingStatus;
}


@Component({
  selector: 'app-trainings',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './trainings.html',
  styleUrl: './trainings.scss'
})
export class Trainings {

  searchTerm = '';

  selectedLevel: 'ALL' | TrainingLevel = 'ALL';

  selectedStatus: 'ALL' | TrainingStatus = 'ALL';


  trainings: Training[] = [

    {
      id: 1,
      title: 'Docker Fundamentals',
      description:
        'Learn Docker basics, containers, images and essential development workflows.',
      provider: 'SmartRecruit Learning',
      url: 'https://example.com/docker-fundamentals',
      level: 'BEGINNER',
      durationHours: 8,
      isFree: true,
      status: 'ACTIVE'
    },

    {
      id: 2,
      title: 'Advanced Spring Boot',
      description:
        'Improve backend development skills with advanced Spring Boot concepts.',
      provider: 'Tech Academy',
      url: 'https://example.com/advanced-spring-boot',
      level: 'ADVANCED',
      durationHours: 20,
      isFree: false,
      status: 'ACTIVE'
    },

    {
      id: 3,
      title: 'Angular Essentials',
      description:
        'Learn Angular components, routing, forms and TypeScript fundamentals.',
      provider: 'Frontend Academy',
      url: 'https://example.com/angular-essentials',
      level: 'BEGINNER',
      durationHours: 12,
      isFree: true,
      status: 'ACTIVE'
    },

    {
      id: 4,
      title: 'MySQL Intermediate',
      description:
        'Improve SQL querying, database design and relational database skills.',
      provider: 'Database Academy',
      url: null,
      level: 'INTERMEDIATE',
      durationHours: 15,
      isFree: false,
      status: 'INACTIVE'
    },

    {
      id: 5,
      title: 'Git and Collaboration',
      description:
        'Learn Git workflows, branches, commits, pull requests and team collaboration.',
      provider: 'SmartRecruit Learning',
      url: 'https://example.com/git-collaboration',
      level: 'ALL_LEVELS',
      durationHours: 6,
      isFree: true,
      status: 'ACTIVE'
    }

  ];


  get filteredTrainings(): Training[] {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();


    return this.trainings.filter(training => {

      const matchesSearch =
        training.title
          .toLowerCase()
          .includes(search) ||

        training.provider
          .toLowerCase()
          .includes(search);


      const matchesLevel =
        this.selectedLevel === 'ALL' ||
        training.level === this.selectedLevel;


      const matchesStatus =
        this.selectedStatus === 'ALL' ||
        training.status === this.selectedStatus;


      return (
        matchesSearch &&
        matchesLevel &&
        matchesStatus
      );

    });

  }


  get totalTrainings(): number {
    return this.trainings.length;
  }


  get activeTrainings(): number {

    return this.trainings.filter(
      training => training.status === 'ACTIVE'
    ).length;

  }


  get inactiveTrainings(): number {

    return this.trainings.filter(
      training => training.status === 'INACTIVE'
    ).length;

  }


  get freeTrainings(): number {

    return this.trainings.filter(
      training => training.isFree
    ).length;

  }


  activateTraining(id: number): void {

    const training =
      this.trainings.find(
        training => training.id === id
      );

    if (!training) {
      return;
    }

    training.status = 'ACTIVE';

  }


  deactivateTraining(id: number): void {

    const training =
      this.trainings.find(
        training => training.id === id
      );

    if (!training) {
      return;
    }

    training.status = 'INACTIVE';

  }


  levelLabel(level: TrainingLevel): string {

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


  statusLabel(status: TrainingStatus): string {

    switch (status) {

      case 'ACTIVE':
        return 'Active';

      case 'INACTIVE':
        return 'Inactive';

    }

  }

}