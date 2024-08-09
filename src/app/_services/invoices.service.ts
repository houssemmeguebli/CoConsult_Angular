import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoices } from "../_models/invoices";

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  private baseUrl: string = "http://localhost:8081/invoices/";

  constructor(private http: HttpClient) { }

  getAllInvoices(): Observable<Invoices[]> {
    return this.http.get<Invoices[]>(this.baseUrl);
  }

  getInvoiceById(id: number): Observable<Invoices> {
    return this.http.get<Invoices>(this.baseUrl + id);
  }

  createInvoice(invoice: Invoices): Observable<Invoices> {
    return this.http.post<Invoices>(this.baseUrl, invoice);
  }

  updateInvoice(invoice: Invoices): Observable<Invoices> {
    return this.http.put<Invoices>(this.baseUrl + 'update', invoice);
  }

  deleteInvoice(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'delete?id=' + id);
  }
}
