import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReclamationService } from 'src/app/_services/reclamation/reclamation.service';

@Component({
  selector: 'app-reclamation-dialog',
  templateUrl: './reclamation-dialog.component.html',
  styleUrls: ['./reclamation-dialog.component.css']
})
export class ReclamationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ReclamationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reclamationService: ReclamationService
  ) {}

  onStatusChange(status: string) {
    this.reclamationService.updateReclamationStatus(this.data.reclamationId, status)
      .subscribe(() => {
        this.dialogRef.close(status);
      }, error => {
        console.error('Error updating reclamation status:', error);
        // Gérer l'erreur (par exemple, afficher un message d'erreur à l'utilisateur)
      });
    }

    onDelete() {
      // Mettez ici votre logique pour supprimer la réclamation
      // Par exemple, vous pouvez appeler un service pour supprimer la réclamation du backend
      // Une fois la suppression effectuée avec succès, vous pouvez fermer la boîte de dialogue ou effectuer d'autres actions nécessaires
      // Voici un exemple de suppression en utilisant un service HTTP :
    
     
      
    }
    

}