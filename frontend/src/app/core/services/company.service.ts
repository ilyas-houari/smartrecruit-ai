import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Company } from '../models/company.model';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  private apiUrl = `${environment.apiBaseUrl}/companies`;


  constructor(
    private http: HttpClient
  ) {}


  /*
   * Official contract (master prompt Section 40) only documents:
   *   POST /api/companies
   *   PUT  /api/companies/{id}
   *
   * There is no documented GET for "my company" — getMe() is a frontend
   * assumption mirroring the /me pattern used for candidates/applications
   * and should be confirmed with Ilyas Houari before the backend is built.
   */

  getMe() {

    return this.http.get<Company>(
      `${this.apiUrl}/me`
    );

  }



  createCompany(company: Partial<Company>) {

    return this.http.post<Company>(
      this.apiUrl,
      company
    );

  }



  updateCompany(id: number, company: Partial<Company>) {

    return this.http.put<Company>(
      `${this.apiUrl}/${id}`,
      company
    );

  }


}
