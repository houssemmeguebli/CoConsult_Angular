import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meeting } from '../_models/Meeting';
@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private baseUrl = 'http://localhost:8081/Pi/meeting';

  constructor(private http: HttpClient) { }

  getAllMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.baseUrl}/getallMeetings`);
  }

  getMeetingById(id: number): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.baseUrl}/getMeetingById/${id}`);
  }

  addMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(`${this.baseUrl}/addMeeting`, meeting);
  }

  deleteMeeting(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteMeeting/${id}`);
  }

  updateMeeting(id: number, updatedMeeting: Meeting): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/updateMeeting/${id}`, updatedMeeting);
  }
  }
