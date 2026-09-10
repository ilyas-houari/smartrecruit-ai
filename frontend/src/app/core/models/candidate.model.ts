export type EducationLevel =
  | 'NONE'
  | 'BAC'
  | 'BAC_2'
  | 'BAC_3'
  | 'MASTER'
  | 'ENGINEERING'
  | 'PHD'
  | 'OTHER';


export type SkillLevel =
  | 'BEGINNER'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'EXPERT';


export type DataSource =
  | 'CV'
  | 'MANUAL'
  | 'AI';


export interface Candidate {

  id: number;

  userId: number;

  city?: string;

  country: string;

  bio?: string;

  linkedinUrl?: string;

  githubUrl?: string;

  portfolioUrl?: string;

  totalExperienceMonths: number;

  highestEducationLevel: EducationLevel;

  profileCompleted: boolean;

  createdAt: string;

  updatedAt: string;

}


export interface CandidateSkill {

  id: number;

  candidateId: number;

  skillId: number;

  level?: SkillLevel;

  source: DataSource;

  confidenceScore?: number;

}


export interface Experience {

  id: number;

  candidateId: number;

  jobTitle: string;

  companyName?: string;

  description?: string;

  startDate?: string;

  endDate?: string;

  isCurrent: boolean;

  durationMonths: number;

  source: DataSource;

}


export interface Education {

  id: number;

  candidateId: number;

  degree: string;

  field?: string;

  institution?: string;

  startYear?: number;

  endYear?: number;

  level: EducationLevel;

  source: DataSource;

}
