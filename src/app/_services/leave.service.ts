import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leave } from '../_models/leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private baseUrl = 'http://localhost:8081/leaves'; 

  constructor(private http: HttpClient) { }

  getLeaves(): Observable<Leave[]> {
    return this.http.get<Leave[]>(this.baseUrl);
  }
  getLeavesByUserId(userId: number): Observable<Leave[]> {
    return this.http.get<Leave[]>('http://localhost:8081/leaves/user'+'/'+userId);
  }
  getLeaveById(leaveId: number): Observable<Leave> {
    return this.http.get<Leave>('http://localhost:8081/leaves'+'/'+leaveId);
  }

  createLeave(leave: Leave, utilId: number): Observable<Leave> {
  return this.http.post<Leave>(`${this.baseUrl}/addleave/${utilId}`, leave);
}

updateLeave(leaveId: number, leave: Leave, utilId: number): Observable<Leave> {
  return this.http.put<Leave>('http://localhost:8081/leaves'+'/'+leaveId +'/'+utilId, leave);
}

  deleteLeave(leaveId: number): Observable<any> {
    return this.http.delete('http://localhost:8081/leaves'+'/'+leaveId);
  }
 
  
}
