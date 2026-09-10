export type UserRole =
  | 'CANDIDATE'
  | 'RECRUITER'
  | 'ADMIN';


export type UserStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'SUSPENDED';


export interface User {

  id: number;

  email: string;

  role: UserRole;

  firstName?: string;

  lastName?: string;

  phone?: string;

  status?: UserStatus;

}
