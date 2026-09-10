import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type CompanyStatus =
  | 'ACTIVE'
  | 'INACTIVE';

interface Company {
  id: number;
  name: string;
  industry: string | null;
  website: string | null;
  city: string | null;
  country: string;
  status: CompanyStatus;
}

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './companies.html',
  styleUrl: './companies.scss'
})
export class Companies {

  searchTerm = '';

  selectedStatus: 'ALL' | CompanyStatus = 'ALL';


  companies: Company[] = [

    {
      id: 1,
      name: 'Nexa Technologies',
      industry: 'Software Development',
      website: 'https://nexa.example.com',
      city: 'Casablanca',
      country: 'Morocco',
      status: 'ACTIVE'
    },

    {
      id: 2,
      name: 'Atlas Digital',
      industry: 'IT Services',
      website: 'https://atlasdigital.example.com',
      city: 'Rabat',
      country: 'Morocco',
      status: 'ACTIVE'
    },

    {
      id: 3,
      name: 'Marrakech Solutions',
      industry: 'Technology Consulting',
      website: null,
      city: 'Marrakech',
      country: 'Morocco',
      status: 'INACTIVE'
    },

    {
      id: 4,
      name: 'North Africa Tech',
      industry: 'Cloud Services',
      website: 'https://natech.example.com',
      city: 'Tangier',
      country: 'Morocco',
      status: 'ACTIVE'
    }

  ];


  get filteredCompanies(): Company[] {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();


    return this.companies.filter(company => {

      const matchesSearch =
        company.name
          .toLowerCase()
          .includes(search) ||

        (company.industry ?? '')
          .toLowerCase()
          .includes(search) ||

        (company.city ?? '')
          .toLowerCase()
          .includes(search);


      const matchesStatus =
        this.selectedStatus === 'ALL' ||
        company.status === this.selectedStatus;


      return (
        matchesSearch &&
        matchesStatus
      );

    });

  }


  get totalCompanies(): number {
    return this.companies.length;
  }


  get activeCompanies(): number {

    return this.companies.filter(
      company => company.status === 'ACTIVE'
    ).length;

  }


  get inactiveCompanies(): number {

    return this.companies.filter(
      company => company.status === 'INACTIVE'
    ).length;

  }


  activateCompany(id: number): void {

    const company =
      this.companies.find(
        company => company.id === id
      );

    if (!company) {
      return;
    }

    company.status = 'ACTIVE';

  }


  deactivateCompany(id: number): void {

    const company =
      this.companies.find(
        company => company.id === id
      );

    if (!company) {
      return;
    }

    company.status = 'INACTIVE';

  }


  statusLabel(status: CompanyStatus): string {

    switch (status) {

      case 'ACTIVE':
        return 'Active';

      case 'INACTIVE':
        return 'Inactive';

    }

  }

}