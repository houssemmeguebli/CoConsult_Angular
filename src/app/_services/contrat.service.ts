import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrats } from "../_models/contrats";

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  private baseUrl: string = "http://localhost:8081/contrats/";

  constructor(private http: HttpClient) { }

  getAllContrats(): Observable<Contrats[]> {
    return this.http.get<Contrats[]>(this.baseUrl);
  }

  getContratById(id: number): Observable<Contrats> {
    return this.http.get<Contrats>(this.baseUrl + id);
  }

  createContrat(contrat: Contrats): Observable<Contrats> {
    return this.http.post<Contrats>(this.baseUrl, contrat);
  }

    updateContrat(updatedContrat: Contrats, id: number): Observable<Contrats> {
        return this.http.put<Contrats>(this.baseUrl + id, updatedContrat);
    }


    deleteContrat(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + id);
  }
}
