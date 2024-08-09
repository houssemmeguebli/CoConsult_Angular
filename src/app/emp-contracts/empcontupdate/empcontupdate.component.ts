import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpContract, Type, NameEmp } from 'src/app/_models/emp-contract';
import { EmpContractService } from 'src/app/_services/emp-contract.service';

@Component({
  selector: 'app-empcontupdate',
  templateUrl: './empcontupdate.component.html',
  styleUrls: ['./empcontupdate.component.css']
})
export class EmpcontupdateComponent implements OnInit {
  empContForm: FormGroup;
  idEmpCont!: number; // Initialize with "!" operator
  ec!: EmpContract; // Initialize with "!" operator

  // Define contractTypes and employeeNames arrays here
  contractTypes: string[] = [];
  employeeNames: string[] = [];

  constructor(
    private fb: FormBuilder,
    private empcontservice: EmpContractService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.empContForm = this.fb.group({
      type: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      nameEmp: ['', Validators.required]
    });

    // Populate contractTypes and employeeNames arrays with enum values
    this.contractTypes = Object.values(Type).filter(value => typeof value === 'string') as string[];
    this.employeeNames = Object.values(NameEmp).filter(value => typeof value === 'string') as string[];
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idEmpCont = +idParam;
  
      this.empcontservice.getEmpContractById(this.idEmpCont).subscribe(
        (data: EmpContract) => {
          this.ec = data;
  
          // Convert date strings to Date objects
          const startDate = new Date(this.ec.startDate);
          const endDate = new Date(this.ec.endDate);
  
          // Patch the form with the converted date values
          this.empContForm.patchValue({
            type: this.ec.type,
            startDate: startDate.toISOString().split('T')[0], // Convert to "yyyy-MM-dd" format
            endDate: endDate.toISOString().split('T')[0], // Convert to "yyyy-MM-dd" format
            nameEmp: this.ec.nameEmp
          });
        },
        (error) => {
          console.error('Error recuperating contract', error);
        }
      );
    } else {
      console.error('ID parameter is null or undefined.');
    }
  }
  
  update(): void {
    if (this.empContForm.valid) {
      const updatedempcontract: EmpContract = this.empContForm.value;
      this.empcontservice.updateEmpContract(this.idEmpCont, updatedempcontract).subscribe(
        (data) => {
          console.log('Updated successfully', data);
          this.router.navigate(['/back/empContracts']);
        },
        (error) => {
          console.error('Error updating', error);
        }
      );
    }
  }
}
