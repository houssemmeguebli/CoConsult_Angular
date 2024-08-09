// reclamation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private http: HttpClient) { }

  updateReclamationStatus(reclamationId: number, newStatus: string) {
    return this.http.put('http://localhost:8081/reclamation/${reclamationId}', { status: newStatus });
  }
}