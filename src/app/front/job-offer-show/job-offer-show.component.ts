import { Component } from '@angular/core';
import {JobOffer} from "../../_models/job-offer";
import {JobOfferService} from "../../_services/job-offer.service";

@Component({
  selector: 'app-job-offer-show',
  templateUrl: './job-offer-show.component.html',
  styleUrls: ['./job-offer-show.component.css']
})
export class JobOfferShowComponent {
  jobOffers: JobOffer[] = [];
  filteredJobOffers: JobOffer[] = [];

  constructor(private  jobOfferService:JobOfferService){}
  ngOnInit(): void {
    this.loadJobOffers();
    //this.getJobOffersByUserId()
  }

  loadJobOffers(): void {
    this.jobOfferService.findAllJobOffers().subscribe(jobOffers => {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      this.filteredJobOffers = jobOffers.filter(jobOffer => {
        return new Date(jobOffer.jobExpirationDate) >= currentDate ; // Ne récupérer que les offres non expirées
      });
    });
  }

}
