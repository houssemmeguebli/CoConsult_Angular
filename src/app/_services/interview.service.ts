import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Interview} from "../_models/interview";
import {catchError, Observable} from "rxjs";
import {EmailRequest} from "../_models/email-request";

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private baseUrl = 'http://localhost:8081/interview';

  constructor(private http: HttpClient) { }

  addInterview(idJobApp: number, interview: Interview): Observable<Interview> {
    return this.http.post<Interview>(`${this.baseUrl}/addInterview/${idJobApp}`, interview);
  }

  updateInterview(id: number, updatedInterview: Interview): Observable<Interview> {
    return this.http.put<Interview>(`${this.baseUrl}/updateInterview/${id}`, updatedInterview);
  }

  deleteInterview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteInterview/${id}`);
  }

  getInterviewById(id: number): Observable<Interview> {
    return this.http.get<Interview>(`${this.baseUrl}/getInterviewById/${id}`);
  }

  getAllInterviews(): Observable<Interview[]> {
    return this.http.get<Interview[]>(`${this.baseUrl}/getAllInterviews`);
  }
  getInerViewsByJobApp(id:number):Observable<Interview>{
    return this.http.get<Interview>(`${this.baseUrl}/getInterviewsByJobApp/${id}`);
  }

  // Envoyer un e-mail
  sendEmail(emailRequest: EmailRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sendMail`, emailRequest)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

}
