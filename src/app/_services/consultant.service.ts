import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultant } from '../_models/Consultant';
import { ActivityManagement } from '../_models/ActivityManagement';
@Injectable({
  providedIn: 'root'
})
export class ConsultantService {
  url: string = 'http://localhost:8081/Pi/consultants';

  constructor(private http: HttpClient) { }

  addConsultant(a:Consultant ): Observable<any> {
    return this.http.post(`${this.url}/addConsultant`, a);
  }

  getAllConsultants(): Observable<Consultant[]> {
    return this.http.get<Consultant[]>(`${this.url}/getAllConsultants`);
  }

  getAllConsultantsWithTasks(): Observable<Consultant[]> {
    return this.http.get<Consultant[]>(`${this.url}/getAllConsultantsWithTasks`);
  }

  deleteConsult(id: number): Observable<any> {
    return this.http.delete(`${this.url}/deleteConsultant/${id}`);
  }
  getConsultById(id:number):Observable<Consultant>{
    return this.http.get<Consultant>(`${this.url}/getConsultById/${id}`)
  }
  getConsultantsNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/getAllConsultantsNames`);
  }
  getTasksByConsultant(consultantName: string): Observable<ActivityManagement[]> {

    return this.http.get<ActivityManagement[]>(`${this.url}/${consultantName}/tasks`);
  }
  updateTask(consultantName: string, taskId: number, updatedTask: ActivityManagement): Observable<ActivityManagement> {
    const updateUrl = `${this.url}/${consultantName}/tasks/${taskId}`;
    return this.http.put<ActivityManagement>(updateUrl, updatedTask);
  }
}
