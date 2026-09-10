export interface Recruiter {

  id: number;

  userId: number;

  /*
   * Nullable during onboarding (master prompt Section 17).
   * A recruiter must have a company before creating/publishing jobs.
   */
  companyId?: number;

  position?: string;

}
