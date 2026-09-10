import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Candidate } from '../models/candidate.model';


@Injectable({
  providedIn: 'root'
})
export class CandidateService {


  private apiUrl = `${environment.apiBaseUrl}/candidates`;


  constructor(
    private http: HttpClient
  ) {}



  getCandidates() {

    return this.http.get<Candidate[]>(
      this.apiUrl
    );

  }



  getCandidateById(id: number) {

    return this.http.get<Candidate>(
      `${this.apiUrl}/${id}`
    );

  }



  createCandidate(candidate: Candidate) {

    return this.http.post<Candidate>(
      this.apiUrl,
      candidate
    );

  }



  updateCandidate(candidate: Candidate) {

    return this.http.put<Candidate>(
      `${this.apiUrl}/${candidate.id}`,
      candidate
    );

  }



  deleteCandidate(id: number) {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }



  /*
   * Official contract (master prompt Section 40):
   * GET  /api/candidates/me
   * PUT  /api/candidates/me
   */

  getMe() {

    return this.http.get<Candidate>(
      `${this.apiUrl}/me`
    );

  }



  updateMe(candidate: Partial<Candidate>) {

    return this.http.put<Candidate>(
      `${this.apiUrl}/me`,
      candidate
    );

  }


}