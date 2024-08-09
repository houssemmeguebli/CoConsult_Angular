import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityManagement } from '../_models/ActivityManagement';

@Injectable({
  providedIn: 'root'
})
export class ActivityManagementService {

  url: string = 'http://localhost:8081/Pi/activitymanagement';

  constructor(private http: HttpClient) { }

  addActivityMangement(a: ActivityManagement): Observable<any> {
    return this.http.post(`${this.url}/addTask`, a);
  }

  getAllActivityManagement(): Observable<ActivityManagement[]> {
    return this.http.get<ActivityManagement[]>(`${this.url}/getAll`);
  }

  getActivityManagementById(id: number): Observable<ActivityManagement> {
    return this.http.get<ActivityManagement>(`${this.url}/getById/${id}`);
  }

  deleteActivityManagement(id: number): Observable<any> {
    return this.http.delete(`${this.url}/delete/${id}`);
  }

  updateActivityManagement(a: ActivityManagement, id: number): Observable<any> {
    return this.http.put(`${this.url}/update/${id}`, a);
  }
  assignTaskToConsultant(taskId: number, consultantId: number): Observable<any> {
    const url = `${this.url}/${taskId}/assign-consultant/${consultantId}`;
    return this.http.put(url, null, { responseType: 'text' });
  }
}
