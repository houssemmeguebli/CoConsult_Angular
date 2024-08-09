import { Component, OnInit} from '@angular/core';
import { Leave } from 'src/app/_models/leave';
import { LeaveService } from 'src/app/_services/leave.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leavebyuser',
  templateUrl: './leavebyuser.component.html',
  styleUrls: ['./leavebyuser.component.css']
})
export class LeavebyuserComponent implements OnInit {
  leaves: Leave[] = [];
  userId!: number; // Define userId property to store the extracted user ID
  totalLeaveDaysInYear: number = 0; // Initialize totalLeaveDaysInYear property to store the total leave days within a year
  yearToCalculate: number = new Date().getFullYear(); // Default year to calculate is the current year

  constructor(private leaveService: LeaveService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Check if route snapshot and paramMap are not null
    if (this.route.snapshot && this.route.snapshot.paramMap) {
      // Extract the user ID from the route parameters
      const userIdParam = this.route.snapshot.paramMap.get('userId');
      if (userIdParam) {
        this.userId = +userIdParam;
        this.leaveService.getLeavesByUserId(this.userId).subscribe(leaves => {
          this.leaves = leaves;
          this.calculateTotalLeaveDays(leaves);
        });
      } else {
        console.error('User ID parameter is missing');
      }
    } else {
      console.error('Route snapshot or paramMap is null');
    }
  }
  isButtonDisabled(): boolean {
    // Define your condition here
    return this.totalLeaveDaysInYear > 30; // Disable button if total days leave is greater than 30
  }
  fetchLeavesByUserId(): void {
    this.leaveService.getLeavesByUserId(this.userId).subscribe(
      leaves => {
        // Filter leaves by user ID
        this.leaves = leaves.filter(leave => leave.user.id === this.userId && leave.etat === 'APPROVED');
        // Calculate total leave days
        this.calculateTotalLeaveDays(leaves);
      },
      error => {
        console.error('Error fetching leaves by user ID:', error);
      }
    );
  }
  
  calculateTotalLeaveDays(leaves: Leave[]): void {
    // Filter leaves for the specified year and approved status
    const approvedLeaves = leaves.filter(leave => {
      const startDate = new Date(leave.startDateLeave);
      const endDate = new Date(leave.endDateLeave);
      return (startDate.getFullYear() === this.yearToCalculate || endDate.getFullYear() === this.yearToCalculate) && leave.etat === 'APPROVED';
    });
  
    // Calculate total leave days
    this.totalLeaveDaysInYear = approvedLeaves.reduce((totalDays, leave) => {
      const startDate = new Date(leave.startDateLeave);
      const endDate = new Date(leave.endDateLeave);
  
      // Calculate the number of days for the leave
      const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return totalDays + daysDiff;
    }, 0);
  }
  
  // Method to delete a leave
  deleteLeave(id: number): void {
    this.leaveService.deleteLeave(id).subscribe(() => {
      this.fetchLeavesByUserId();

      // After deleting a leave, recalculate the total leave days
      this.leaveService.getLeavesByUserId(this.userId).subscribe(leaves => {
        this.leaves = leaves;
        this.calculateTotalLeaveDays(leaves);
      });
    });
  }
}
