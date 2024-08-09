import { Component, OnInit } from '@angular/core';
import { JobApplication } from "../../_models/job-application";
import { JobApplicationService } from "../../_services/job-application.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import {JobOffer} from "../../_models/job-offer";

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css']
})
export class JobApplicationComponent implements OnInit {
  jobApplicationsforJobOffer: JobApplication[] = [];
  searchForm!: FormGroup;
  showSearch: boolean = false;
  jobApplicationForm: FormGroup;
  pdfUrl: string = '';
  searchResult: string = '';
  applicationName!: string;
  jobApplications: JobApplication[] = [];
  searchTerm: string = '';
  noJobAppFound: boolean = false;
  searchTermm: string[] = [];
  searchButtonClicked: boolean = false;
  jobOfferId!:number;
  jobOfferName: string = '';
  sortBy: string = '';
  sortOrder: string = 'asc';

  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  constructor(private jobApplicationService: JobApplicationService, private route: ActivatedRoute, private router: Router) {
    this.jobApplicationForm = new FormGroup({
      nameApplicant: new FormControl('', Validators.required),
      emailApplicant: new FormControl('', Validators.required),
      phoneApplicant: new FormControl('', Validators.required),
      positionNumber: new FormControl('', Validators.required),
      resumePath: new FormControl('', Validators.required)
    });

    this.searchForm = new FormGroup({
      searchTerms: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getJobApplications();
    this.jobOfferId = this.route.snapshot.params['id'];


  }

  getJobApplications(): void {
    const id = this.route.snapshot.params['id'];
    this.jobApplicationService.getByJobOfferId(id)
      .subscribe(
        jobApplications => {
          this.jobApplicationsforJobOffer = jobApplications;
          this.totalItems = jobApplications.length;

          this.jobOfferName = jobApplications[0].jobOffer.jobName;
          console.log(this.jobApplicationsforJobOffer);
        },
        error => {
          console.log('Erreur lors de la récupération des candidatures:', error);
        }
      );
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

  getPageJobAPP(): JobApplication[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    return this.jobApplicationsforJobOffer.slice(startIndex, endIndex);
  }


  sortJobOffersByExpirationDate(): void {
    this.sortBy = 'expirationDate';
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';

    if (this.sortOrder === 'asc') {
      this.jobApplicationsforJobOffer.sort((a, b) => (a.dateApplication > b.dateApplication) ? 1 : -1);
    } else {
      this.jobApplicationsforJobOffer.sort((a, b) => (a.dateApplication < b.dateApplication) ? 1 : -1);
    }
  }


  deletJobApplication(id: number) {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        this.jobApplicationService.deleteJobApplication(id).subscribe(
          (data) => {
            console.log("Suppression effectuée avec succès");
            this.ngOnInit(); // Réinitialiser les données après la suppression
            Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
          },
          (error) => {
            console.error("Erreur lors de la suppression:", error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the file.",
              "error"
            );
          }
        );
      }
    });
  }

  showSearchForm() {
    this.showSearch = true;
  }
  // Dans votre fichier job-application.component.ts

  hideSearch() {
    this.showSearch = false;
    window.location.reload();

  }


  searchResume(resumePath: string, applicationName: string) {
    this.pdfUrl = resumePath; // Stocker le chemin du PDF
    this.applicationName = applicationName; // Stocker le nom de l'application
    this.showSearch = true; // Afficher le formulaire de recherche
  }

  searchInPDF() {
    const searchTerms = (this.searchForm.get('searchTerms')?.value as string).split(',').map((term: string) => term.trim());
    // Appeler le service pour rechercher dans le PDF
    this.jobApplicationService.searchInPDF(this.pdfUrl, searchTerms)
      .subscribe(
        (result) => {
          console.log('Résultat de la recherche :', result);
          this.searchResult = result; // Mettre à jour searchResult avec le résultat de la recherche

        },
        (error) => {
          console.error('Erreur lors de la recherche :', error);
        }
      );
  }
  searchJobApplications() {

    if (this.searchTerm.trim() !== '') {
      if (this.jobApplicationsforJobOffer.length === 0) {
        const idOffre = this.route.snapshot.params['id']; // Obtenez l'identifiant de l'offre d'emploi depuis l'URL
        this.jobApplicationService.getByJobOfferId(idOffre)
          .subscribe(
            (data: JobApplication[]) => { // Utilisez un tableau de JobApplication
              this.jobApplicationsforJobOffer = data;
              this.filterJobApplications(); // Appliquer le filtre sur les candidatures d'emploi
            },
            error => {
              console.log('An error occurred:', error);
            }
          );
      } else {
        this.filterJobApplications();
      }
    } else {
      this.getJobApplications(); // Charger toutes les candidatures d'emploi pour cette offre
      this.noJobAppFound = false;
    }
  }


  filterJobApplications() {
    this.jobApplicationsforJobOffer = this.jobApplicationsforJobOffer.filter(application =>
      application.nameApplicant.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Mettre à jour la variable noJobAppFound en fonction du nombre de candidatures d'emploi trouvées
    this.noJobAppFound = this.jobApplications.length === 0;
  }


  searchPDFs(jobOfferId: number): void {

    if (this.searchTermm.length > 0) {
      this.jobApplicationService.extractPDFs(jobOfferId, this.searchTermm)
        .subscribe(
          (result) => {
            this.jobApplications = result;
            this.searchButtonClicked= true ;

          },
          (error) => {
            console.error('Erreur lors de la recherche :', error);
          }
        );
    }
  }





}



