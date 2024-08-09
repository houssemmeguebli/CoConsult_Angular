import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratService } from "../../_services/contrat.service";
import { Contrats } from "../../_models/contrats";
import * as moment from 'moment';

// Validation personnalisée pour vérifier si la date de début est au minimum la date actuelle
function startDateValidator(control: FormControl): { [key: string]: boolean } | null {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();
  if (selectedDate < currentDate) {
    return { 'invalidStartDate': true };
  }
  return null;
}

// Validation personnalisée pour vérifier si la date de fin est ultérieure à la date de début
function endDateValidator(control: FormControl): { [key: string]: boolean } | null {
  const startDate = new Date(control.parent?.get('startDate')?.value);
  const endDate = new Date(control.value);
  if (endDate <= startDate) {
    return { 'invalidEndDate': true };
  }
  return null;
}

@Component({
  selector: 'app-update-contrat-back',
  templateUrl: './update-contrat-back.component.html',
  styleUrls: ['./update-contrat-back.component.css']
})
export class UpdateContratBackComponent implements OnInit {
  idContrat!: number;
  contrat!: Contrats;
  contratForm!: FormGroup;

  constructor(private contratService: ContratService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Récupérer l'ID du contrat à partir de l'URL
    this.idContrat = this.route.snapshot.params['id'];
    console.log('ID du contrat récupéré de l\'URL :', this.idContrat);

    // Initialiser le formulaire et charger les données du contrat
    this.initForm();
    this.loadContrat();
  }

  initForm() {
    this.contratForm = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.minLength(6)]),
      startDate: new FormControl('', [Validators.required, startDateValidator]), // Validation de date de début
      endDate: new FormControl('', [Validators.required, endDateValidator]), // Validation de date de fin
      projectName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      etat: new FormControl('', Validators.required)
    });
  }

  loadContrat() {
    this.contratService.getContratById(this.idContrat).subscribe(
      contrat => {
        this.contrat = contrat;
        this.contratForm.patchValue({
          description: contrat.description,
          startDate: moment(contrat.startDate).format('YYYY-MM-DD'), // Formatage de la date de début
          endDate: moment(contrat.endDate).format('YYYY-MM-DD'), // Formatage de la date de fin
          projectName: contrat.projectName,
          email: contrat.email,
          etat: contrat.etat
        });
      },
      error => {
        console.error('Error loading contrat:', error);
      }
    );
  }

  updateContrat() {
    if (this.contratForm.valid) {
      const updatedContrat: Contrats = {
        idContrat: this.idContrat, // Utilize the existing ID of the contract
        ...this.contratForm.value
      };

      this.contratService.updateContrat(updatedContrat, this.idContrat).subscribe(
        () => {
          console.log('Contrat updated successfully');
          this.router.navigate(['/back/contrat']);
        },
        error => {
          console.error('Error updating contrat:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
