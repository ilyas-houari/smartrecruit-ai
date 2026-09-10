export type CompanyStatus =
  | 'ACTIVE'
  | 'INACTIVE';


export interface Company {

  id: number;

  name: string;

  description?: string;

  website?: string;

  city?: string;

  country: string;

  industry?: string;

  logoUrl?: string;

  status: CompanyStatus;

}
