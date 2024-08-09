import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddingReport } from '../_models/AddingReport';

@Injectable({
  providedIn: 'root'
})
export class AddingReportsService {
  getActivityManagementById(trainId: number) {
    throw new Error('Method not implemented.');
  }
  deleteTraining(trainId: number) {
    throw new Error('Method not implemented.');
  }
  url :string ='http://localhost:8081/Pi/addingreport'
  constructor(private http: HttpClient) { }

  addReport(r:AddingReport):Observable<any>{
    return this.http.post(this.url+'/addReport',r)
  }

  getAllRepots():Observable<AddingReport[]>{
    return this.http.get<AddingReport[]>(this.url+'/getAllReports')
  }

  getReportById(id:number):Observable<AddingReport>{
    return this.http.get<AddingReport>(`${this.url}/getReportById/${id}`)
  }

  deleteReport(id: number): Observable<any> {
    return this.http.delete(`${this.url}/deleteReport/${id}`);
  }
  updateReport(id: number, report: AddingReport): Observable<any> {
    const newReportDate = report.addingreportsDate instanceof Date ? report.addingreportsDate.toISOString() : report.addingreportsDate;
    return this.http.put(`${this.url}/updateReport/${id}`, report, {
      params: {
        newProjectName: report.projectname,
        newConsultantname: report.consultantname,
        newDescription: report.addingreportsDescpriton,
        newReportDate: newReportDate
      }
    });
  }

 

}
