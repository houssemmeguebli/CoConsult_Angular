import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../_models/project";
import {JobOffer} from "../_models/job-offer";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  private baseUrl: string = "http://localhost:8081/project/";

  constructor(private http: HttpClient) {
  }

  getAllProjectsByUserId(userId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}getByUser?user_id=${userId}`);
  }

  addProject(project: Project, id: number): Observable<Project> {
    return this.http.post<Project>(this.baseUrl + 'addProject/' + id, project);
  }

  deleteProject(id: number) {
    return this.http.delete(this.baseUrl + 'deleteProject/' + id);
  }

  updateProject(project: Project, id: number): Observable<Project> {
    return this.http.put<Project>(this.baseUrl + 'updateProject/' + id, project);

  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(this.baseUrl + 'getProjectbyid/' + id);
  }

}

