import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Performance } from '../_models/performance';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private baseUrl = 'http://localhost:8081/performances'; 

  constructor(private http: HttpClient) { }

  getPerformances(): Observable<Performance[]> {
    return this.http.get<Performance[]>(this.baseUrl);
  }
  getPerformanceByUserId(userId: number): Observable<Performance[]> {
    return this.http.get<Performance[]>(`${this.baseUrl}/user/${userId}`);
  }
  getPerformanceById(performanceId: number): Observable<Performance> {
    return this.http.get<Performance>(`${this.baseUrl + 'getPerformanceById'}/${performanceId}`);
  }

  createPerformance(performance: Performance): Observable<Performance> {
    return this.http.post<Performance>(this.baseUrl + 'createPerformance', performance);
  }

  updatePerformance(performanceId: number, performance: Performance): Observable<Performance> {
    return this.http.put<Performance>(`${this.baseUrl + 'updatePerformance'}/${performanceId}`, performance);
  }

  deletePerformance(performanceId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl + 'deletePerformance'}/${performanceId}`);
  }
}
