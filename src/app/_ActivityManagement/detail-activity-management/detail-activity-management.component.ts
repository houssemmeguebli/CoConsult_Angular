import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityManagementService } from 'src/app/_services/activity-management.service';
import { ActivityManagement } from 'src/app/_models/ActivityManagement';
@Component({
  selector: 'app-detail-activity-management',
  templateUrl: './detail-activity-management.component.html',
  styleUrls: ['./detail-activity-management.component.css']
})
export class DetailActivityManagementComponent implements OnInit {
  task: ActivityManagement = new ActivityManagement();

  constructor(private activityService: ActivityManagementService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const taskId = Number(params.get('id'));
      this.activityService.getActivityManagementById(taskId).subscribe(task => {
        this.task = task;
      });
    });
  }


  navigateToUpdateTask(taskId: number): void {
    this.router.navigate(['/update', taskId]);
  }

  deleteTask(taskId: number): void {
    this.activityService.deleteActivityManagement(taskId).subscribe({
      next: () => {
        console.log('Task deleted successfully!');
        this.router.navigate(['/getAll']);
      },
      error: (err: any) => {
        console.error('Error deleting task:', err);
      }
    });
  }
}
