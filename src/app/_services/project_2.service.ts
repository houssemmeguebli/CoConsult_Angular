import { Injectable } from '@angular/core';
import { Project } from '../_models/project';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Project_2Service {
  baseUrl :string ='http://localhost:8081/Pi/project'
  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/getAll`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/getById/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/add`, project);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/update/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  assignConsultantToProject(projectId: number, consultantId: number): Observable<Project> {
    const url = `${this.baseUrl}/assignConsultant/${projectId}/${consultantId}`;
    return this.http.put<Project>(url, null);
  }
}
