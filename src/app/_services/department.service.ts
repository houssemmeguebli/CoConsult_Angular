import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../_models/department'; 

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  
    private baseUrl: string = "http://localhost:8081/departments"; // Remove trailing slash
  
    constructor(private http: HttpClient) { }
  
    findAllDepartments(): Observable<Department[]> {
      return this.http.get<Department[]>(this.baseUrl);
    }
    
  getDepartmentById(departmentId: number): Observable<Department> {
    return this.http.get<Department>('http://localhost:8081/departments'+'/'+departmentId);
  }

  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>('http://localhost:8081/departments', department);
  }

  updateDepartment(departmentId: number, department: Department): Observable<Department> {
    return this.http.put<Department>('http://localhost:8081/departments'+'/'+departmentId , department);
  }

  deleteDepartment(departmentId: number): Observable<any> {
    return this.http.delete('http://localhost:8081/departments'+'/'+departmentId);
  }
}
