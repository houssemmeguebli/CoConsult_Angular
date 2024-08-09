import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpContract } from '../_models/emp-contract';

@Injectable({
  providedIn: 'root'
})
export class EmpContractService {
  private baseUrl : string = 'http://localhost:8081/empContracts'; 

  constructor(private http: HttpClient) { }

  getEmpContracts(): Observable<EmpContract[]> {
    return this.http.get<EmpContract[]>(this.baseUrl);
  }

  getEmpContractById(contractId: number): Observable<EmpContract> {
    return this.http.get<EmpContract>('http://localhost:8081/empContracts'+'/' +contractId);
  }

  createEmpContract(contract: EmpContract): Observable<EmpContract> {
    return this.http.post<EmpContract>('http://localhost:8081/empContracts', contract);
  }

  updateEmpContract(contractId: number, contract: EmpContract): Observable<EmpContract> {
    return this.http.put<EmpContract>('http://localhost:8081/empContracts'+'/'+contractId , contract);
  }

  deleteEmpContract(contractId: number): Observable<any> {
    return this.http.delete('http://localhost:8081/empContracts'+'/' +contractId);
  }
}
