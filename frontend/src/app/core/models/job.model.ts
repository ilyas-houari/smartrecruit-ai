import { EducationLevel, SkillLevel } from './candidate.model';


export type WorkMode =
  | 'ONSITE'
  | 'REMOTE'
  | 'HYBRID';


export type ContractType =
  | 'CDI'
  | 'CDD'
  | 'INTERNSHIP'
  | 'FREELANCE'
  | 'PART_TIME'
  | 'OTHER';


export type JobStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'CLOSED'
  | 'ARCHIVED';


export interface JobSkill {

  id: number;

  jobOfferId: number;

  skillId: number;

  requiredLevel?: SkillLevel;

  mandatory: boolean;

  weight?: number;

}


export interface Job {

  id: number;

  recruiterId?: number;

  companyId?: number;

  companyName?: string;

  title: string;

  location: string;

  workMode: WorkMode;

  contractType: ContractType;

  requiredExperienceYears?: number;

  requiredEducationLevel?: EducationLevel;

  salaryMin?: number;

  salaryMax?: number;

  publishedAt?: string;

  deadline?: string;

  status: JobStatus;

  description?: string;

  skills: string[];

  applicants?: number;

  createdAt?: string;

  updatedAt?: string;

}
