export type TrainingLevel =
  | 'BEGINNER'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'ALL_LEVELS';


export type TrainingStatus =
  | 'ACTIVE'
  | 'INACTIVE';


export interface Training {

  id: number;

  title: string;

  description?: string;

  provider?: string;

  url?: string | null;

  level: TrainingLevel;

  durationHours?: number;

  isFree: boolean;

  status: TrainingStatus;

  createdAt?: string;

  updatedAt?: string;

}


export interface TrainingSkill {

  id: number;

  trainingId: number;

  skillId: number;

}


export interface JobRecommendation {

  id: number;

  candidateId: number;

  jobOfferId: number;

  recommendationScore: number;

  reason?: string;

}


export interface TrainingRecommendation {

  id: number;

  candidateId: number;

  trainingId: number;

  recommendationScore: number;

  reason?: string;

}
