import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl: string = "http://localhost:8081/send-email";

  constructor(private http: HttpClient) { }

  sendEmail(invoiceData: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.baseUrl, JSON.stringify(invoiceData), { headers });
  }
}
