import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../_services/leave.service';
import { Leave } from '../../_models/leave';
import { UserService } from 'src/app/_services/user-service.service';
import { User } from 'src/app/_models/userCopy';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  leaves: Leave[] = [];
  users: User[] = [];
  signature: ArrayBuffer | null = null;
  id: number = 0;
  unseenLeavesCount: number = 0;
  averageLeavesPerMonth: { month: string, average: number }[] = [];

  constructor(private leaveService: LeaveService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadLeaves();
    this.loadUserById(this.id);
 
  }

  loadUserById(id: number): void {
    this.userService.getUserById(id).subscribe(user => {
      this.users.push(user);
    });
  }

  loadLeaves(): void {
    this.leaveService.getLeaves().subscribe(leaves => {
      // Sort leaves by start date
      this.leaves = leaves.sort((a, b) => {
        return new Date(b.startDateLeave).getTime() - new Date(a.startDateLeave).getTime();
      });
      this.leaves.forEach(leave => {
        if (!leave.user) {
          leave.user = { id: this.id } as User;
        }
        //this.loadUserById(leave.user.id);
        if (leave.etat === 'UNSEEN') {
          this.unseenLeavesCount++;
        }
      });
    });
  }
  calcalculateAverageLeavesPerMonth(): { month: string, average: number }[] {
    const leavesByMonth: { [month: string]: Leave[] } = {};
    const averages: { month: string, average: number }[] = []; // New array to store averages
  
    // Group leaves by month
    this.leaves.forEach(leave => {
      const month = new Date(leave.startDateLeave).toLocaleString('default', { month: 'long' });
      if (!leavesByMonth[month]) {
        leavesByMonth[month] = [];
      }
      leavesByMonth[month].push(leave);
    });
  
    // Calculate average leaves per month and push into averages array
    for (const month in leavesByMonth) {
      if (leavesByMonth.hasOwnProperty(month)) {
        const totalDays = leavesByMonth[month].reduce((acc, leave) => acc + this.calculateLeaveDays(leave), 0);
        const averageDays = totalDays / leavesByMonth[month].length;
        averages.push({ month: month, average: averageDays });
      }
    }
  
    return averages; // Return the array of averages
  }
  

  calculateLeaveDays(leave: Leave): number {
    const start = new Date(leave.startDateLeave);
    const end = new Date(leave.endDateLeave);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  getUserFirstName(userId: number): string {
    const leaveUser = this.users.find(u => u.id === userId);
    return leaveUser ? leaveUser.firstname : '';
  }

  deleteLeave(id: number) {
    this.leaveService.deleteLeave(id).subscribe(() => this.ngOnInit());
  }

  dataURLToArrayBuffer(dataURL: string): ArrayBuffer | null {
    const byteString = atob(dataURL.split(',')[1]);
    const byteStringLength = byteString.length;
    const arrayBuffer = new ArrayBuffer(byteStringLength);
    const uint8Array = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < byteStringLength; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
  
    return arrayBuffer;
  }
  getEtatBackgroundColor(etat: string): string {
    switch (etat) {
      case 'UNSEEN':
        return '#FFA500'; // orange
      case 'REJECTED':
        return '#FF0000'; // red
      case 'APPROVED':
        return '#008000'; // green
      default:
        return '#FFFFFF'; // white
    }
  }
}
