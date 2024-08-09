import { Component } from '@angular/core';
import { Department } from 'src/app/_models/department';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'src/app/_services/department.service';

@Component({
  selector: 'app-departdetail',
  templateUrl: './departdetail.component.html',
  styleUrls: ['./departdetail.component.css']
})
export class DepartdetailComponent {
  idDepart!:number
  department!:Department
  
    constructor(private Act:ActivatedRoute, private departmentservice:DepartmentService) {
      
    }
  
    ngOnInit(){
      this.idDepart=this.Act.snapshot.params['id']
      this.departmentservice.getDepartmentById(this.idDepart).subscribe((data)=>this.department=data)
      
  
    }
}
