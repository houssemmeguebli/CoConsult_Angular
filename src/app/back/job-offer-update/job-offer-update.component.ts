import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import { JobOfferService } from "../../_services/job-offer.service";
import { JobOffer } from "../../_models/job-offer";
import Swal from "sweetalert2";
import * as moment from 'moment';

@Component({
  selector: 'app-job-offer-update',
  templateUrl: './job-offer-update.component.html',
  styleUrls: ['./job-offer-update.component.css']
})
export class JobOfferUpdateComponent implements OnInit {
  jobOfferForm!: FormGroup;
  jobOfferId!: number;
  jobOffer!: JobOffer;

  constructor(private jobOfferService: JobOfferService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.jobOfferForm = new FormGroup({
      jobName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      jobDescription: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
      jobExpirationDate: new FormControl('', [Validators.required]),
      positionNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)])
    });

    // Récupérer l'ID de l'offre d'emploi à partir de l'URL
    this.jobOfferId = +this.route.snapshot.paramMap.get('id')!;

    // Récupérer les données de l'offre d'emploi à mettre à jour
    this.jobOfferService.getJobOfferById(this.jobOfferId).subscribe(
      (data: JobOffer) => {
        this.jobOffer = data;
        // Pré-remplir le formulaire avec les données récupérées
        this.jobOfferForm.patchValue({
          jobName: this.jobOffer.jobName,
          jobDescription: this.jobOffer.jobDescription,
          jobExpirationDate: moment(this.jobOffer.jobExpirationDate).format('YYYY-MM-DD'), // Formatage de la date d'expiration
          positionNumber: this.jobOffer.positionNumber
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'offre d\'emploi:', error);
      }
    );
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  Update(): void {
    if (this.jobOfferForm.valid) {
      const updatedJobOffer: JobOffer = this.jobOfferForm.value;
      this.jobOfferService.updateJobOffer(this.jobOfferId, updatedJobOffer).subscribe(
        (data) => {
          console.log('Mise à jour de l\'offre d\'emploi réussie:', data)
          Swal.fire({ // Afficher une alerte SweetAlert en cas de succès
            title: "Success!",
            text: "Job offer updated successfully!",
            icon: "success"
          });
          this.router.navigate(['/back/jobOffers']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'offre d\'emploi:', error);
        }
      );
    }
  }
}
