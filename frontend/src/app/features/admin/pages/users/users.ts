import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


type UserRole =
  | 'ADMIN'
  | 'CANDIDATE'
  | 'RECRUITER';


type UserStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'SUSPENDED';


interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {

  searchTerm = '';

  selectedRole: 'ALL' | UserRole = 'ALL';

  selectedStatus: 'ALL' | UserStatus = 'ALL';


  users: User[] = [

    {
      id: 1,
      firstName: 'Jamie',
      lastName: 'Diaz',
      email: 'jamie.diaz@example.com',
      phone: '+212 6 12 34 56 78',
      role: 'CANDIDATE',
      status: 'ACTIVE',
      createdAt: '2026-08-10'
    },

    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.wilson@nexa.com',
      phone: '+212 6 22 33 44 55',
      role: 'RECRUITER',
      status: 'ACTIVE',
      createdAt: '2026-08-12'
    },

    {
      id: 3,
      firstName: 'Adam',
      lastName: 'Smith',
      email: 'adam.smith@example.com',
      phone: null,
      role: 'CANDIDATE',
      status: 'INACTIVE',
      createdAt: '2026-08-14'
    },

    {
      id: 4,
      firstName: 'Lina',
      lastName: 'Martin',
      email: 'lina.martin@example.com',
      phone: '+212 6 44 55 66 77',
      role: 'CANDIDATE',
      status: 'ACTIVE',
      createdAt: '2026-08-17'
    },

    {
      id: 5,
      firstName: 'Omar',
      lastName: 'Bennani',
      email: 'omar.bennani@nexa.com',
      phone: '+212 6 88 99 11 22',
      role: 'RECRUITER',
      status: 'SUSPENDED',
      createdAt: '2026-08-20'
    },

    {
      id: 6,
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@smartrecruit.ai',
      phone: null,
      role: 'ADMIN',
      status: 'ACTIVE',
      createdAt: '2026-08-01'
    }

  ];


  get filteredUsers(): User[] {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();


    return this.users.filter(user => {

      const fullName =
        `${user.firstName} ${user.lastName}`
          .toLowerCase();


      const matchesSearch =
        fullName.includes(search) ||
        user.email.toLowerCase().includes(search);


      const matchesRole =
        this.selectedRole === 'ALL' ||
        user.role === this.selectedRole;


      const matchesStatus =
        this.selectedStatus === 'ALL' ||
        user.status === this.selectedStatus;


      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );

    });

  }


  get totalUsers(): number {
    return this.users.length;
  }


  get activeUsers(): number {

    return this.users.filter(
      user => user.status === 'ACTIVE'
    ).length;

  }


  get inactiveUsers(): number {

    return this.users.filter(
      user => user.status === 'INACTIVE'
    ).length;

  }


  get suspendedUsers(): number {

    return this.users.filter(
      user => user.status === 'SUSPENDED'
    ).length;

  }


  activateUser(id: number): void {

    const user =
      this.users.find(
        user => user.id === id
      );

    if (!user) {
      return;
    }

    user.status = 'ACTIVE';

  }


  deactivateUser(id: number): void {

    const user =
      this.users.find(
        user => user.id === id
      );

    if (!user) {
      return;
    }

    user.status = 'INACTIVE';

  }


  roleLabel(role: UserRole): string {

    switch (role) {

      case 'ADMIN':
        return 'Admin';

      case 'CANDIDATE':
        return 'Candidate';

      case 'RECRUITER':
        return 'Recruiter';

    }

  }


  statusLabel(status: UserStatus): string {

    switch (status) {

      case 'ACTIVE':
        return 'Active';

      case 'INACTIVE':
        return 'Inactive';

      case 'SUSPENDED':
        return 'Suspended';

    }

  }


  fullName(user: User): string {

    return `${user.firstName} ${user.lastName}`;

  }

}