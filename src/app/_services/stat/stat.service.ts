import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  private baseUrl = 'http://localhost:8080/stat'; // Assurez-vous de mettre le bon port et l'URL ici

  constructor(private http: HttpClient) { }

  getGenderStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/gender`);
  }

  getRoleStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/roles`);
  }
}
