import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reclamation } from 'src/app/_models/reclamation.model';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'; // Importez SweetAlert
import { ReclamationDialogComponent } from '../reclamation-dialog/reclamation-dialog.component';

@Component({
  selector: 'app-reclamation-admin',
  templateUrl: './reclamation-admin.component.html',
  styleUrls: ['./reclamation-admin.component.css']
})
export class ReclamationAdminComponent implements OnInit {
  
  reclamations: Reclamation[] = [];

  constructor(
    private http: HttpClient,  
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllReclamations();
  }

  getAllReclamations(): void {
    this.http.get<Reclamation[]>('http://localhost:8081/reclamation/getAllReclamation')
      .subscribe({
        next: (reclamations) => {
          this.reclamations = reclamations;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des réclamations :', error);
        }
      });
  }

  openDialog(reclamation: Reclamation): void {
    const description = reclamation.description;
    // Appeler la route du backend pour détecter les mots inappropriés
    this.detectBadWords(description).then(response => {
      if (response === 'La description contient des mots inappropriés.') {
        // Si des mots inappropriés sont détectés, afficher une alerte avec SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Mots inappropriés détectés',
          text: 'La description contient des mots inappropriés.'
        });
      } else if (response === 'La description est propre.') {
        // Si la description est propre, ouvrir le dialogue normal
        const dialogRef = this.dialog.open(ReclamationDialogComponent, {
          width: '450px',
          data: { description: description, reclamationId: reclamation.reclamationID }
        });
      
        dialogRef.afterClosed().subscribe(result => {
          if (result === 'PROCESSED' || result === 'REJECTED') {
            // La mise à jour du statut de la réclamation est gérée dans le composant ReclamationDialogComponent
          }
        });
      } else {
        console.error('Réponse inattendue du serveur :', response);
      }
    }).catch(error => {
      console.error('Erreur lors de la détection de mots inappropriés :', error);
    });
  }
  
  // Méthode pour détecter les mots inappropriés
  async detectBadWords(description: string): Promise<string> {
    try {
      const response: string | undefined = await this.http.post('http://localhost:8081/reclamation/detect-bad-words', description, { responseType: 'text' }).toPromise();
      if (response === undefined) {
        throw new Error('Réponse du serveur non valide');
      }
      console.log(response); // Gérer la réponse de la détection de mots inappropriés ici
      return response.trim(); // Retourne la réponse du serveur après suppression des espaces inutiles
    } catch (error) {
      console.error('Erreur lors de la détection de mots inappropriés :', error);
      // Afficher une alerte en cas d'erreur
      Swal.fire({
        icon: 'error',
        title: 'Mots inappropriés détectés',
        text: 'La description contient des mots inappropriés'
      });
      throw error; // Lancer l'erreur pour la gérer dans la méthode openDialog
    }
  }
  
  

  onDelete(reclamation: Reclamation): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas récupérer cette réclamation!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete('http://localhost:8081/reclamation/deleteReclamation/${reclamation.reclamationID}')
          .subscribe({
            next: () => {
              this.reclamations = this.reclamations.filter(item => item.reclamationID !== reclamation.reclamationID);
              Swal.fire(
                'Supprimé!',
                'Votre réclamation a été supprimée avec succès.',
                'success'
              );
            },
            error: (error) => {
              console.error('Erreur lors de la suppression de la réclamation :', error);
              Swal.fire(
                'Erreur!',
                'Une erreur est survenue lors de la suppression de la réclamation. Veuillez réessayer plus tard.',
                'error'
              );
            }
          });
      }
    });
  }
}