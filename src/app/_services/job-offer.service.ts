import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {JobOffer} from "../_models/job-offer";

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {

  private baseUrl:string = "http://localhost:8081/jobOffer/" ;

  constructor(private http:HttpClient ) { }


  findAllJobOffers():Observable<JobOffer[]>{
    return this.http.get<JobOffer[]>(this.baseUrl + "getAllJobOffer")
  }
  AddJobOffer(jobOffer : JobOffer,id:number){
    return this.http.post(this.baseUrl+"addJobOffer/"+ id ,jobOffer)
  }

  getJobOffersByUserId(userId: number): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(this.baseUrl+"getJobOfferByUserId/" + userId);
  }


  DeleteJobOffer(id:number){
    return this.http.delete(this.baseUrl+"deleteJobOffer/" + id );
  }
  updateJobOffer(id: number, updatedJobOffer: JobOffer): Observable<JobOffer> {
    return this.http.put<JobOffer>(`${this.baseUrl}updateJobOffer/${id}`, updatedJobOffer);
  }
  getJobOfferById(id: number): Observable<JobOffer> {
    const url = `${this.baseUrl}getJobOfferById/${id}`;
    return this.http.get<JobOffer>(url);
  }

  getJobOfferByName(name: string): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(`${this.baseUrl}getJobOfferByName?name=${name}`);
  }
  findJobApplicationByJobOffer(id:number){


  }

}
