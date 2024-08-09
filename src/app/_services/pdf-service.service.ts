// pdf.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private baseUrl = 'http://localhost:8081/pdf/departments'; // Update the URL accordingly

  constructor(private http: HttpClient) { }

  generateDepartmentsPdf(): Observable<Blob> {
    return this.http.get(this.baseUrl, { responseType: 'blob' });
  }
}
