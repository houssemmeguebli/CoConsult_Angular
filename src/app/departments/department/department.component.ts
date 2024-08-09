import { Component, OnInit } from '@angular/core';
import { Department } from '../../_models/department';
import { DepartmentService } from '../../_services/department.service';
import { PdfService } from 'src/app/_services/pdf-service.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  department!:Department;
  constructor(private departmentService: DepartmentService,private pdfService: PdfService) { }

  ngOnInit(): void {
    this.loadDepartments();
  }
  supp(id:number){
    this.departmentService.deleteDepartment(id).subscribe(()=>this.ngOnInit())
  }

  loadDepartments(): void {
    this.departmentService.findAllDepartments().subscribe(departments=>
      {this.departments= departments;
        
      });}
      generatePdf(): void {
        this.pdfService.generateDepartmentsPdf().subscribe(
          (data: Blob) => {
            const blob = new Blob([data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
          },
          error => {
            console.error('Error generating PDF:', error);
          }
        );
      }
    
  }

