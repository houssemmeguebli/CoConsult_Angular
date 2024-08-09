import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  baseUrl: string = 'http://localhost:8081/Pi';

  constructor(private http: HttpClient) { }

  sendVerificationCode(email: string): Observable<any> {
    const body = { email };
    return this.http.post(`${this.baseUrl}/sendVerificationCode`, body, { responseType: 'text' });
  }

  verifyCode(email: string, code: string): Observable<any> {
    const verificationUrl = 'http://localhost:8081/Pi/verifyCode';
    const body = { email, code };
    return this.http.post(verificationUrl, body, { responseType: 'text' });
  }


}
