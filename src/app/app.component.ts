import { Component } from '@angular/core';
import { DepartmentService } from './_services/department.service';
import { PerformanceService } from './_services/performance.service';
import { EmpContractService } from './_services/emp-contract.service';
import { LeaveService } from './_services/leave.service';
import { Department } from './_models/department';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  editingDepart: Department | null = null;
  title = 'CoConsult';
  constructor(private departmentService : DepartmentService, 
    private performanceService : PerformanceService, 
    private empContractService : EmpContractService, 
    private leaveService : LeaveService) { }
}
