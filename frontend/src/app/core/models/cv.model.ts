export type CvStatus =
  | 'UPLOADED'
  | 'PROCESSING'
  | 'ANALYZED'
  | 'VALIDATED'
  | 'FAILED';


export interface CurrentCv {
  name: string;
  format: 'PDF' | 'DOCX';
  uploadedAt: string;
  size: string;
}


export interface ExtractedSkill {
  name: string;
  category: string;
  level: string;
}


export interface ExtractedExperience {
  jobTitle: string;
  company: string;
  period: string;
  description: string;
}


export interface ExtractedEducation {
  degree: string;
  institution: string;
  period: string;
  level: string;
}


export interface CvAnalysis {
  skills: ExtractedSkill[];
  experiences: ExtractedExperience[];
  educations: ExtractedEducation[];
}
