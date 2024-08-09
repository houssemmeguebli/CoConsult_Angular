import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { EmpContractService } from 'src/app/_services/emp-contract.service';
import { Router } from '@angular/router';
import { Type, NameEmp } from '../../_models/emp-contract'; // Import Type and NameEmp enums

@Component({
  selector: 'app-empcontadd',
  templateUrl: './empcontadd.component.html',
  styleUrls: ['./empcontadd.component.css']
})
export class EmpcontaddComponent {
  empcontractForm: FormGroup;

  // Define contractTypes and employeeNames arrays here
  contractTypes: string[] = [];
  employeeNames: string[] = [];

  constructor(private formBuilder: FormBuilder, private empcontractservice: EmpContractService, private router: Router) {
    console.log('Type keys:', Object.keys(Type));
    console.log('NameEmp keys:', Object.keys(NameEmp));
    this.contractTypes = Object.values(Type).filter(value => typeof value === 'string') as string[];
    this.employeeNames = Object.values(NameEmp).filter(value => typeof value === 'string') as string[];
    
    
    
    

    this.empcontractForm = this.formBuilder.group({
      type: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', [Validators.required, this.endDateAfterStartDateValidator('startDate')]], // Using custom validator here
      nameEmp: ['', Validators.required]
    });
  }

  save() {
    if (this.empcontractForm.valid) {
      console.log(this.empcontractForm.value);
      this.empcontractservice.createEmpContract(this.empcontractForm.value).subscribe(() => {
        console.log('Contrat employé créé avec succès');
        this.router.navigateByUrl('/back/empContracts');
      }, error => {
        console.error('Une erreur s\'est produite lors de la création du contrat employé :', error);
      });
    } else {
      console.log('Le formulaire est invalide. Veuillez remplir tous les champs correctement.');
      // Marquer tous les champs comme touchés pour afficher les messages d'erreur associés
      this.markFormGroupTouched(this.empcontractForm);
    }
  }

  // Custom validator function to check if end date is after start date
  endDateAfterStartDateValidator(startDateControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const startDate = control.root.get(startDateControlName)?.value;
      const endDate = control.value;

      if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
        return { 'endDateBeforeStartDate': true };
      }

      return null;
    };
  }

  // Fonction pour marquer tous les champs d'un FormGroup comme touchés
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
