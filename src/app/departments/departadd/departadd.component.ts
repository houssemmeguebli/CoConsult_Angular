import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/_services/department.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departadd',
  templateUrl: './departadd.component.html',
  styleUrls: ['./departadd.component.css']
})
export class DepartaddComponent{
  departmentForm: FormGroup= new FormGroup({
  departmentName: new FormControl('', Validators.required),
  managerName: new FormControl ('', Validators.required),
}); // Use ! operator to assert it will be initialized


  constructor(private formBuilder: FormBuilder, private departmentservice: DepartmentService, private router:Router) { }


  save(){
    console.log(this.departmentForm.value)
    this.departmentservice.createDepartment(this.departmentForm.value as any).subscribe(()=>this.router.navigateByUrl('/departments'))  }
}
