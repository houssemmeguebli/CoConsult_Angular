import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reclamation, ReclamationStatus } from 'src/app/_models/reclamation.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  reclamations: Reclamation[] = []; // Initialisation avec un tableau vide
  newReclamation: Reclamation = new Reclamation();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllReclamations();
  }

  getAllReclamations() {
    this.http.get<Reclamation[]>('http://localhost:8081/reclamation/getAllReclamation')
      .subscribe(reclamations => {
        this.reclamations = reclamations;
      });
  }

  addReclamation() {
    // Ajouter la date et le statut avant d'envoyer la réclamation au backend
    this.newReclamation.creationDate = new Date().toISOString(); // Obtenez la date actuelle et convertissez-la en chaîne ISO
    this.newReclamation.status = ReclamationStatus.PENDING; // Définir le statut comme PENDING
  
    // Envoi de la réclamation au backend
    this.http.post<Reclamation>('http://localhost:8081/reclamation/addReclamation', this.newReclamation)
      .subscribe(() => {
        // Afficher la SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Réclamation enregistrée!',
          showConfirmButton: false,
          timer: 1500
        });
  
        // Mettre à jour la liste des réclamations après l'ajout
        this.getAllReclamations();
        
        // Réinitialiser le formulaire pour une nouvelle réclamation
        this.newReclamation = new Reclamation();
      });
  }
  

  updateReclamation(id: number, updatedReclamation: Reclamation) {
    this.http.put<Reclamation>('http://localhost:8081/reclamation/${id}', updatedReclamation)
      .subscribe(() => {
        this.getAllReclamations();
      });
  }

  deleteReclamation(id: number) {
    this.http.delete('http://localhost:8081/reclamation/deleteReclamation/${id}')
      .subscribe(() => {
        this.getAllReclamations();
      });
  }
}
