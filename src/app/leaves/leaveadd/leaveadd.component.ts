import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from 'src/app/_services/leave.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TypeLeave } from '../../_models/leave';

@Component({
  selector: 'app-leaveadd',
  templateUrl: './leaveadd.component.html',
  styleUrls: ['./leaveadd.component.css']
})
export class LeaveaddComponent implements OnInit {
  leaveForm!: FormGroup;
  leaveTypes: string[] = [];
  userId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private leaveService: LeaveService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
  }
  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // January is 0
    const day = today.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  }
  


  save(): void {
    if (this.leaveForm.valid) {
      const leave = this.leaveForm.value;
      this.leaveService.createLeave(leave, this.userId).subscribe(() => {
        console.log('Leave created successfully');
        this.router.navigate(['/back/leaves/user', this.userId]);
      }, error => {
        console.error('An error occurred while creating the leave:', error);
      });
    } else {
      console.log('The form is invalid. Please fill all fields correctly.');
      this.markFormGroupTouched(this.leaveForm);
    }
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

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  private getUserIdFromRoute(): number {
    const userIdParam = this.route.snapshot.paramMap.get('userId');
    return userIdParam ? parseInt(userIdParam, 10) : 0;
  }
}
