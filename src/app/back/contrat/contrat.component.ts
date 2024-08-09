import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Contrats} from "../../_models/contrats";
import {ContratService} from "../../_services/contrat.service";

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent implements OnInit {
  contrats: Contrats[] = [];

  constructor(private contratService: ContratService,private router: Router) { }

  ngOnInit(): void {
    this.loadContrats();
  }

  loadContrats() {
    this.contratService.getAllContrats().subscribe(
      contrats => {
        this.contrats = contrats;
      },
      error => {
        console.error('Error loading contrats:', error);
      }
    );
  }

  viewContrat(contrat: Contrats) {
    // Implement view functionality
    console.log('View contract:', contrat);
  }

  deleteContrat(id: number) {
    if (confirm('Are you sure you want to delete this contract?')) {
      this.contratService.deleteContrat(id).subscribe(
        () => {
          // Remove the deleted contract from the list
          this.contrats = this.contrats.filter(contrat => contrat.idContrat !== id);
        },
        error => {
          console.error('Error deleting contract:', error);
        }
      );
    }
  }

  createContrat(newContrat: Contrats) {
    this.contratService.createContrat(newContrat).subscribe(
      createdContrat => {
        this.contrats.push(createdContrat);
      },
      error => {
        console.error('Error creating contract:', error);
      }
    );
  }

  updateContrat(updatedContrat: Contrats) {
    this.contratService.updateContrat(updatedContrat, updatedContrat.idContrat).subscribe(
        () => {
          const index = this.contrats.findIndex(contrat => contrat.idContrat === updatedContrat.idContrat);
          if (index !== -1) {
            this.contrats[index] = updatedContrat;
          }
        },
        error => {
          console.error('Error updating contract:', error);
        }
    );
  }


  editContrat(contrat: Contrats) {
    // Rediriger vers la page de mise à jour du contrat avec l'ID du contrat
    this.router.navigate(['/update-contrat', contrat.idContrat]); // Supposons que l'URL pour la mise à jour soit '/update-contrat/:idContrat'
  }

  navigateToAddInvoice(idContrat: number) {
    this.router.navigate(['/back/addInvoices', idContrat]); // Naviguer vers addInvoices avec l'ID du contrat
  }
}
