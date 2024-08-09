import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../_models/feedback';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = 'http://localhost:8081/Pi/feedbacks';

  constructor(private http: HttpClient) { }


  addFeedback(feedback: Feedback,id:number, consultantName: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/addFeedback/${id}/${consultantName}`, feedback);
  }
  getAllFeedbacks():Observable<Feedback[]>{
    return this.http.get<Feedback[]>(this.baseUrl+'/allFeedbacks')
  }
  deleteFeedback(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteFeedback/${id}`);
  }

}
