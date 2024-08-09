import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { JobOfferService } from "../../_services/job-offer.service";
import { JobOffer } from "../../_models/job-offer";
import {JobApplication} from "../../_models/job-application";
import {JobApplicationService} from "../../_services/job-application.service";
import {ActivatedRoute} from "@angular/router";
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import {AuthenticationService} from "../../_services/authentication/authentication.service";

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.css']
})
export class JobOfferComponent implements OnInit {
  jobOffers: JobOffer[] = [];
  jobApplications: JobApplication[] = [];
  jobOffer!: JobOffer;
  jobOfferForm: FormGroup;
  id:  number= this.authService.logDecodedTokenId();
  searchTerm: string = '';
  allJobOffers: JobOffer[] = [];
  noJobOffersFound: boolean = false;
  sortBy: string = '';
  sortOrder: string = 'asc';
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 3;

  constructor(private jobOfferService: JobOfferService,
              private jobApplicationService: JobApplicationService,
              private route: ActivatedRoute,
              private authService: AuthenticationService
  ) {
    this.jobOfferForm = new FormGroup({
      jobName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      jobDescription: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
      jobExpirationDate: new FormControl('', [Validators.required]),
      positionNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)])
    });
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  Add() {
    if (this.jobOfferForm.valid) {
      this.jobOfferService.AddJobOffer(this.jobOfferForm.value, this.id).subscribe(data => {
        console.log('Job offer added successfully:', data);
        this.jobOfferForm.reset();
        this.ngOnInit();
        Swal.fire({ // Afficher une alerte SweetAlert en cas de succès
          title: "Success!",
          text: "Job offer added successfully!",
          icon: "success"
        });
      },
          error => {
        console.error('Error adding job offer:', error);
        Swal.fire({ // Afficher une alerte SweetAlert en cas d'erreur
          title: "Error!",
          text: "Failed to add job offer. Please try again later.",
          icon: "error"
        });
      });
    } else {
      // Afficher une alerte SweetAlert si le formulaire n'est pas valide
      Swal.fire({
        title: "Error!",
        text: "Please fill in all fields correctly.",
        icon: "error"
      });
    }
  }
  ngOnInit(): void {
    this.loadJobOffers();
  }
  loadJobOffers(): void {
    this.jobOfferService.getJobOffersByUserId(this.id).subscribe(jobOffers => {
      this.jobOffers = jobOffers;
      this.totalItems = jobOffers.length;
    });
  }
  isDatePassed(date: string | Date): boolean {
    return new Date(date) < new Date();
  }

  today(): string {
    return new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD pour la comparaison
  }


  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  getPageJobOffers(): JobOffer[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    return this.jobOffers.slice(startIndex, endIndex);
  }


  sortJobOffersByExpirationDate(): void {
    this.sortBy = 'expirationDate';
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    if (this.sortOrder === 'asc') {
      this.jobOffers.sort((a, b) => (a.jobExpirationDate > b.jobExpirationDate) ? 1 : -1);
    } else {
      this.jobOffers.sort((a, b) => (a.jobExpirationDate < b.jobExpirationDate) ? 1 : -1);
    }
  }


  Delete(id: number): void {
    Swal.fire({
      title: "Are you sure you want to delete this job offer?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        this.jobOfferService.DeleteJobOffer(id).subscribe(
          (data) => {
            console.log("Suppression de l'offre d'emploi effectuée avec succès");
            this.ngOnInit(); // Réinitialiser les données après la suppression
            Swal.fire(
              "Deleted!",
              "The job offer has been deleted.",
              "success"
            );
          },
          (error) => {
            console.error("Erreur lors de la suppression de l'offre d'emploi:", error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the job offer.",
              "error"
            );
          }
        );
      }
    });
  }

  showForm: boolean = false;

  toggleForm() {
    this.showForm = !this.showForm;
  }

  generatePDF(): void {
    // Sélectionnez les données de job offers
    const jobOffersData = this.jobOffers.map(j => ({
      'Job Name': j.jobName,
      'Job Description': j.jobDescription,
      'Job Expiration Date': new Date(j.jobExpirationDate).toLocaleDateString(),
      'Position Number': j.positionNumber.toString()
    }));

    // Créez un nouveau document PDF
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Ajoutez un titre en haut de la première page
    const title = 'Job Offers';
    pdf.setFontSize(16);
    pdf.text(title, 105, 15, { align: 'center' });

    // Ajoutez un saut de ligne après le titre
    pdf.text(title, 105, 15, { align: 'center' });

    // Ajoutez le tableau de données
    pdf.table(25, 25, jobOffersData, ['Job Name', 'Job Description', 'Job Expiration Date', 'Position Number'], { autoSize: true });

    // Générer le PDF en tant que Blob
    const pdfBlob = pdf.output('blob');

    // Créer une URL blob à partir des données du PDF
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Ouvrir le PDF dans un nouvel onglet
    window.open(pdfUrl, '_blank');




}


  searchJobOffers() {
    if (this.searchTerm.trim() !== '') {
      if (this.allJobOffers.length === 0) {
        // Si les offres d'emploi n'ont pas encore été chargées, les charger
        this.jobOfferService.findAllJobOffers()
          .subscribe(
            (data: JobOffer[]) => {
              this.allJobOffers = data;
              this.filterJobOffers(); // Appliquer le filtre sur les offres d'emploi

            },
            error => {
              console.log('An error occurred:', error);
            }
          );
      } else {
        this.filterJobOffers();

      }
    } else {
      this.loadJobOffers();
      this.noJobOffersFound =false;

    }
  }

  filterJobOffers() {
    this.jobOffers = this.allJobOffers.filter(offer =>
      offer.jobName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Mettre à jour la variable noJobOffersFound en fonction du nombre d'offres trouvées
    this.noJobOffersFound = this.jobOffers.length === 0;

  }





}

    /*
      getJobOffersByUserId(): void {
        if (this.id) { // Vérifiez que this.id est défini
          this.jobOfferService.getJobOffersByUserId(this.id).subscribe(
            (jobOffers: JobOffer[]) => {
              this.jobOffers = jobOffers;
            },
            (error) => {
              console.error('Erreur lors de la récupération des offres d\'emploi pour l\'utilisateur:', error);
              // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
            }
          );
        } else {
          console.error('ID de l\'utilisateur non défini.');
          // Gérer le cas où this.id n'est pas défini, par exemple afficher un message à l'utilisateur
        }
      }

     */
