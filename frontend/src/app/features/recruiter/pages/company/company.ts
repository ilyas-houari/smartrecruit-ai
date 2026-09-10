import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CompanyService } from '../../../../core/services/company.service';


@Component({
  selector: 'app-company',

  standalone: true,

  imports: [
    FormsModule
  ],

  templateUrl: './company.html',

  styleUrl: './company.scss'
})
export class Company implements OnInit {

  private readonly companyService = inject(CompanyService);


  isSaving = false;

  companySaved = false;

  saveError = '';


  /*
   * Null until the recruiter's company is loaded (or created) —
   * a recruiter may not have a company yet during onboarding
   * (master prompt Section 17).
   */
  private companyId: number | null = null;


  /*
   * `employees` and `email` are UI-only — they aren't part of the
   * official `companies` table contract (Section 18), so they're
   * kept local and not sent to the backend.
   */
  company = {

    name: 'Nexa Technologies',

    industry: 'Software Development',

    location: 'Casablanca, Morocco',

    website: 'https://nexa-technologies.com',

    employees: '50 - 100',

    email: 'contact@nexa.com',

    description:
      'Nexa Technologies builds modern software solutions using AI, cloud technologies and scalable backend systems.'

  };



  ngOnInit(): void {

    this.companyService.getMe().subscribe({

      next: (company) => {

        this.companyId = company.id;

        this.company.name = company.name;
        this.company.industry = company.industry ?? '';
        this.company.website = company.website ?? '';
        this.company.description = company.description ?? '';

        this.company.location = company.city
          ? `${company.city}, ${company.country}`
          : company.country;

      },

      error: () => {

        // Backend not connected yet — keep the demo defaults
        // already in the form.

      }

    });

  }



  saveChanges(): void {

    this.companySaved = false;
    this.saveError = '';

    if (!this.company.name.trim()) {
      return;
    }

    this.isSaving = true;

    const [city, ...countryParts] = this.company.location
      .split(',')
      .map(part => part.trim());

    const payload = {
      name: this.company.name,
      industry: this.company.industry,
      website: this.company.website,
      description: this.company.description,
      city: countryParts.length > 0 ? city : undefined,
      country: countryParts.length > 0 ? countryParts.join(', ') : city
    };

    const request = this.companyId === null
      ? this.companyService.createCompany(payload)
      : this.companyService.updateCompany(this.companyId, payload);

    request.subscribe({

      next: (company) => {
        this.companyId = company.id;
        this.isSaving = false;
        this.companySaved = true;
      },

      error: () => {
        this.isSaving = false;
        this.saveError =
          'Unable to reach the server right now. Your changes were not saved.';
      }

    });

  }


}
