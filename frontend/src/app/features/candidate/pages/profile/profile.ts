import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CandidateService } from '../../../../core/services/candidate.service';
import { EducationLevel } from '../../../../core/models/candidate.model';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {

  private readonly formBuilder = inject(FormBuilder);

  private readonly candidateService = inject(CandidateService);

  profileCompletion = 72;

  isSaving = false;
  profileSaved = false;
  saveError = '';

  readonly profileForm = this.formBuilder.nonNullable.group({

    firstName: [
      'Jamie',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]
    ],

    lastName: [
      'Diaz',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]
    ],

    email: [
      'jamie.diaz@example.com',
      [
        Validators.required,
        Validators.email,
        Validators.maxLength(150)
      ]
    ],

    phone: [
      '+212 6 12 34 56 78',
      [
        Validators.maxLength(30),
        Validators.pattern(/^[0-9+\-() ]*$/)
      ]
    ],

    city: [
      'Casablanca',
      Validators.maxLength(100)
    ],

    country: [
      'Morocco',
      Validators.maxLength(100)
    ],

    bio: [
      'Software engineering candidate interested in backend development, Java, Spring Boot and modern web technologies.',
      Validators.maxLength(1000)
    ],

    linkedinUrl: [
      'https://linkedin.com/in/jamiediaz',
      Validators.maxLength(500)
    ],

    githubUrl: [
      'https://github.com/jamiediaz',
      Validators.maxLength(500)
    ],

    portfolioUrl: [
      '',
      Validators.maxLength(500)
    ],

    highestEducationLevel: [
      'BAC_3',
      Validators.required
    ]
  });


  readonly skills = [
    {
      id: 1,
      name: 'Java',
      category: 'Programming Language',
      level: 'ADVANCED',
      source: 'CV'
    },
    {
      id: 2,
      name: 'Spring Boot',
      category: 'Backend',
      level: 'ADVANCED',
      source: 'CV'
    },
    {
      id: 3,
      name: 'Angular',
      category: 'Frontend',
      level: 'INTERMEDIATE',
      source: 'MANUAL'
    },
    {
      id: 4,
      name: 'MySQL',
      category: 'Database',
      level: 'ADVANCED',
      source: 'CV'
    },
    {
      id: 5,
      name: 'REST API',
      category: 'Backend',
      level: 'ADVANCED',
      source: 'CV'
    },
    {
      id: 6,
      name: 'Git',
      category: 'Development Tool',
      level: 'INTERMEDIATE',
      source: 'MANUAL'
    }
  ];


  readonly experiences = [
    {
      id: 1,
      jobTitle: 'Backend Developer Intern',
      companyName: 'Nexa Technologies',
      startDate: 'Mar 2026',
      endDate: 'Jul 2026',
      duration: '5 months',
      description:
        'Worked on REST APIs using Java, Spring Boot and MySQL.',
      source: 'MANUAL'
    },
    {
      id: 2,
      jobTitle: 'Web Development Intern',
      companyName: 'Digital Horizon',
      startDate: 'Jul 2025',
      endDate: 'Sep 2025',
      duration: '3 months',
      description:
        'Built frontend interfaces and integrated REST services.',
      source: 'CV'
    }
  ];


  readonly educations = [
    {
      id: 1,
      degree: 'Bachelor in Software Engineering',
      field: 'Computer Science',
      institution: 'Faculty of Science and Technology',
      period: '2023 — 2026',
      level: 'BAC+3',
      source: 'CV'
    }
  ];


  get firstName() {
    return this.profileForm.controls.firstName;
  }

  get lastName() {
    return this.profileForm.controls.lastName;
  }

  get email() {
    return this.profileForm.controls.email;
  }

  get phone() {
    return this.profileForm.controls.phone;
  }


  ngOnInit(): void {

    this.candidateService.getMe().subscribe({

      next: (candidate) => {

        this.profileForm.patchValue({
          city: candidate.city ?? '',
          country: candidate.country,
          bio: candidate.bio ?? '',
          linkedinUrl: candidate.linkedinUrl ?? '',
          githubUrl: candidate.githubUrl ?? '',
          portfolioUrl: candidate.portfolioUrl ?? '',
          highestEducationLevel: candidate.highestEducationLevel
        });

      },

      error: () => {

        // Backend not connected yet — keep the demo defaults
        // already in the form.

      }

    });

  }


  onSubmit(): void {

    this.profileSaved = false;
    this.saveError = '';

    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;

    const {
      city,
      country,
      bio,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
      highestEducationLevel
    } = this.profileForm.getRawValue();

    this.candidateService.updateMe({
      city,
      country,
      bio,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
      highestEducationLevel: highestEducationLevel as EducationLevel
    }).subscribe({

      next: () => {
        this.isSaving = false;
        this.profileSaved = true;
      },

      error: () => {
        this.isSaving = false;
        this.saveError =
          'Unable to reach the server right now. Your changes were not saved.';
      }

    });

  }
}