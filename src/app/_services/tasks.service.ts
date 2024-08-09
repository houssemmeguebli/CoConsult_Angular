import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tasks } from "../_models/tasks";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private baseUrl: string = "http://localhost:8081/tasks/";

  constructor(private http: HttpClient) { }

  getByEmail(email: string): Observable<Tasks[]> {
    const url = `${this.baseUrl}emailRecipient/${email}`; // Concaténer l'email à l'URL de base
    return this.http.get<Tasks[]>(url);
  }

  getAllTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(this.baseUrl);
  }

  getTaskById(id: number): Observable<Tasks> {
    return this.http.get<Tasks>(this.baseUrl + id);
  }

  createTask(task: Tasks): Observable<Tasks> {
    return this.http.post<Tasks>(this.baseUrl, task);
  }

    updateTask(task: Tasks, taskId: number): Observable<Tasks> {
    return this.http.put<Tasks>(this.baseUrl + task.idTasks, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + id);
  }
}
