import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { JobApplication } from '../_models/job-application';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  private baseUrl = 'http://localhost:8081/jobApplication';

  constructor(private http: HttpClient) { }

  addJobApplication(file: File, name: string, email: string, phone: string, idJobOffer: number): Observable<JobApplication> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<JobApplication>(`${this.baseUrl}/addJobApp/${idJobOffer}`, formData, { headers: headers })
      .pipe(
        catchError(error => {
          console.error('Error adding job application:', error);
          return throwError(error);
        })
      );
  }
  updateJobApplication(updatedJobApplication: JobApplication, id: number): Observable<JobApplication> {
    return this.http.put<JobApplication>(`${this.baseUrl}/updateJobApp/${id}`, updatedJobApplication);
  }

  deleteJobApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteJobApp/${id}`);
  }

  getAllJobApplications(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.baseUrl}/getAllJobApp`);
  }

  getJobApplicationById(id: number): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${this.baseUrl}/getJobAppById/${id}`);
  }
  getByJobOfferId(id:number):Observable<JobApplication[]>{
    return this.http.get<JobApplication[]>(`${this.baseUrl}/getJobApplicationByJobOffer/${id}`);
  }
  searchInPDF(pdfUrl: string, searchTerms: string[]): Observable<string> {
    const apiUrl = `http://localhost:8081/jobApplication/extractPDF?pdfUrl=${pdfUrl}&searchTerms=${searchTerms.join(',')}`;
    return this.http.get<string>(apiUrl, { responseType: 'text' as 'json' });
  }


  extractPDFs(jobOfferId: number,searchTerms: string[]): Observable<JobApplication[]> {
    if (!Array.isArray(searchTerms)) {
      searchTerms = [searchTerms]; // S'assurer que searchTerm est un tableau
    }
    const apiUrlWithParams = `http://localhost:8081/jobApplication/extractPDFs/${jobOfferId}?searchTerm=${encodeURIComponent(searchTerms.join(','))}`;
    return this.http.post<JobApplication[]>(apiUrlWithParams, {});
  }




  findJobApplicationsByName(name: string): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.baseUrl}/jobApplications/findByName?name=${name}`);
  }
}
