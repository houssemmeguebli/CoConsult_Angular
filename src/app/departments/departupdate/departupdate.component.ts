import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/_models/department';
import { DepartmentService } from 'src/app/_services/department.service';

@Component({
  selector: 'app-departupdate',
  templateUrl: './departupdate.component.html',
  styleUrls: ['./departupdate.component.css']
})
export class DepartupdateComponent implements OnInit {
  departmentForm!: FormGroup;
  idDepart!: number;
  department!: Department;

  constructor(
    private fb: FormBuilder,
    private departmentservice: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.departmentForm = this.fb.group({
      departmentName: ['', Validators.required],
      managerName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.idDepart = +this.route.snapshot.paramMap.get('id')!;

    this.departmentservice.getDepartmentById(this.idDepart).subscribe(
      (data: Department) => {
        this.department = data;
        this.departmentForm.patchValue({
          departmentName: this.department.departmentName,
          managerName: this.department.managerName
        });
      },
      (error) => {
        console.error('Error recuperating the department', error);
      }
    );
  }

  update(): void {
    if (this.departmentForm.valid) {
      const updateddepartment: Department = this.departmentForm.value;
      this.departmentservice.updateDepartment(this.idDepart, updateddepartment).subscribe(
        (data) => {
          console.log('Updated successfully', data);
          this.router.navigate(['/back/departments']);
        },
        (error) => {
          console.error('Error updating', error);
        }
      );
    }
  }
}
