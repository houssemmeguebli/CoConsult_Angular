import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveService } from 'src/app/_services/leave.service';
import { TypeLeave } from '../../_models/leave'; // Import TypeLeave enum

@Component({
  selector: 'app-leaveupdate',
  templateUrl: './leaveupdate.component.html',
  styleUrls: ['./leaveupdate.component.css']
})
export class LeaveupdateComponent implements OnInit {
  leaveForm!: FormGroup;
  leaveId! : number;
  leaveTypes: string[] = []; // Declare leaveTypes property
  userId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private leaveService: LeaveService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    // Initialize leaveTypes property
    this.leaveTypes = Object.values(TypeLeave).filter(value => typeof value === 'string') as string[];
  }

  ngOnInit(): void {
    this.leaveTypes = Object.values(TypeLeave).filter(value => typeof value === 'string') as string[];
    this.userId = this.getUserIdFromRoute(); // Get user ID from route parameters

    this.leaveForm = this.formBuilder.group({
      userId: [this.userId], // Automatically assign the user ID
      typeLeave: ['', Validators.required],
      startDateLeave: [this.getTodayDate(), Validators.required], // Set default value to today's date
      endDateLeave: ['', Validators.required],
    }, {
      validators: this.endDateAfterStartDateValidator('startDateLeave', 'endDateLeave')
    });
  
    // Get the leave ID from the route parameters
    this.route.params.subscribe(params => {
      this.leaveId = +params['leaveId'];
      this.loadLeave(this.leaveId);
    });
  }
  
  private getUserIdFromRoute(): number {
    const userIdParam = this.route.snapshot.paramMap.get('userId');
    return userIdParam ? parseInt(userIdParam, 10) : 0;
  }
  
  loadLeave(leaveId: number): void {
    this.leaveService.getLeaveById(leaveId).subscribe(leave => {
      // Convert date values to "yyyy-MM-dd" format
      const startDate = new Date(leave.startDateLeave).toISOString().split('T')[0];
      const endDate = new Date(leave.endDateLeave).toISOString().split('T')[0];
  
      // Populate the form fields with leave data
      this.leaveForm.patchValue({
        typeLeave: leave.typeLeave,
        startDateLeave: startDate,
        endDateLeave: endDate,
      });
    });
  }
    
  

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // January is 0
    const day = today.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  }
  endDateAfterStartDateValidator(startDateControlName: string, endDateControlName: string) {
    return (formGroup: FormGroup) => {
      const startDate = formGroup.get(startDateControlName)?.value;
      const endDate = formGroup.get(endDateControlName)?.value;

      if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
        formGroup.get(endDateControlName)?.setErrors({ 'endDateBeforeStartDate': true });
      } else {
        formGroup.get(endDateControlName)?.setErrors(null);
      }
    };
  }


  save(): void {
    if (this.leaveForm.valid) {
      const leave = this.leaveForm.value;
      const leaveId = this.leaveId;
  
      // Set the userId to 0
  
      // Update the leave
      this.leaveService.updateLeave(leaveId, leave,this.userId).subscribe(() => {
        console.log('Leave updated successfully');
        this.leaveService.deleteLeave(leaveId).subscribe();
        this.router.navigate(['/back/leaves/user', this.userId]);
      }, error => {
        console.error('An error occurred while updating the leave:', error);
      });
    } else {
      console.log('The form is invalid. Please fill all fields correctly.');
      // Mark all fields as touched to display associated error messages
      this.markFormGroupTouched(this.leaveForm);
    }
  }
  
  
  
  
  
  

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
