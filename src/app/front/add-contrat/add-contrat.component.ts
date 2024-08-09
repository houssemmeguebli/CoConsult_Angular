import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ContratService } from '../../_services/contrat.service';
import {Router} from "@angular/router";

// Validation personnalisée pour vérifier si la date de début est au minimum la date actuelle
function startDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();
  if (selectedDate < currentDate) {
    return { 'invalidStartDate': true };
  }
  return null;
}

// Validation personnalisée pour vérifier si la date de fin est ultérieure à la date de début
function endDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const startDate = new Date(control.parent?.get('startDate')?.value);
  const endDate = new Date(control.value);
  if (endDate <= startDate) {
    return { 'invalidEndDate': true };
  }
  return null;
}

@Component({
  selector: 'app-add-contrat',
  templateUrl: './add-contrat.component.html',
  styleUrls: ['./add-contrat.component.css']
})
export class AddContratComponent {
  addContratForm: FormGroup;

  constructor(private fb: FormBuilder, private contratService: ContratService ,private router: Router) {
    this.addContratForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(6)]],
      startDate: ['', [Validators.required, startDateValidator]], // Validation de date de début
      endDate: ['', [Validators.required, endDateValidator]], // Validation de date de fin
      projectName: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  addContrat() {
    if (this.addContratForm.valid) {
      this.contratService.createContrat(this.addContratForm.value).subscribe(
        createdContrat => {
          console.log('Contrat ajouté avec succès :', createdContrat);
          this.addContratForm.reset();
          this.router.navigate(['/front/contrat']);
        },
        error => {
          console.error('Erreur lors de l\'ajout du contrat :', error);
        }
      );
    } else {
      console.error('Données de formulaire invalides');
    }
  }

  reset() {
    this.addContratForm.reset();
  }
}
