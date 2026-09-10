import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Application, MatchingResult } from '../models/application.model';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {


  private apiUrl = `${environment.apiBaseUrl}/applications`;


  constructor(
    private http: HttpClient
  ) {}



  getApplications() {

    return this.http.get<Application[]>(
      this.apiUrl
    );

  }



  getApplicationById(id: number) {

    return this.http.get<Application>(
      `${this.apiUrl}/${id}`
    );

  }



  createApplication(application: Application) {

    return this.http.post<Application>(
      this.apiUrl,
      application
    );

  }



  updateApplication(application: Application) {

    return this.http.put<Application>(
      `${this.apiUrl}/${application.id}`,
      application
    );

  }



  deleteApplication(id: number) {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }



  /*
   * Official contract (master prompt Section 40):
   * GET   /api/applications/me
   * PATCH /api/applications/{id}/withdraw
   */

  getMyApplications() {

    return this.http.get<Application[]>(
      `${this.apiUrl}/me`
    );

  }



  withdraw(id: number) {

    return this.http.patch<Application>(
      `${this.apiUrl}/${id}/withdraw`,
      {}
    );

  }



  /*
   * Official contract (master prompt Section 40) — recruiter side:
   * GET   /api/jobs/{jobId}/applicants
   * PATCH /api/applications/{id}/status
   * GET   /api/applications/{id}/matching
   * GET   /api/jobs/{jobId}/ranking
   */

  getApplicantsForJob(jobId: number) {

    return this.http.get<Application[]>(
      `${environment.apiBaseUrl}/jobs/${jobId}/applicants`
    );

  }



  updateStatus(id: number, status: Application['status']) {

    return this.http.patch<Application>(
      `${this.apiUrl}/${id}/status`,
      { status }
    );

  }



  getMatching(applicationId: number) {

    return this.http.get<MatchingResult>(
      `${this.apiUrl}/${applicationId}/matching`
    );

  }



  getRanking(jobId: number) {

    return this.http.get<Application[]>(
      `${environment.apiBaseUrl}/jobs/${jobId}/ranking`
    );

  }


}