import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityManagementService } from 'src/app/_services/activity-management.service';
import { ActivityManagement } from 'src/app/_models/ActivityManagement';
// import { FilterPipe } from '../app-filter.pipe';
import { NgForm } from '@angular/forms';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { Consultant } from 'src/app/_models/Consultant';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-list-activity-management',
  templateUrl: './list-activity-management.component.html',
  styleUrls: ['./list-activity-management.component.css'],
  // providers: [FilterPipe]
})
export class ListActivityManagementComponent implements OnInit {


  listMangement: ActivityManagement[] = [];
  searchText: string = '';
consultantId!: number;
selectedConsultantId!: number;
consultants: Consultant[] = [];
filteredTasks: ActivityManagement[] = [];
  constructor(private activityService: ActivityManagementService, private datePipe: DatePipe, private router: Router, private consultantService: ConsultantService) { }
task !: string;
  ngOnInit(): void {
    this.fetchTasks();
    this.fetchConsultants();
    this.fetchData();

  }

  fetchTasks() {
    this.activityService.getAllActivityManagement().subscribe({
      next: (data) => {
        this.listMangement = data;      },
      error: (error) => console.log(error),
      complete: () => console.log('done')
    });
  }


  sortByHoursAsc() {
    this.listMangement.sort((a, b) => a.numberofhours - b.numberofhours);
  }

  sortByHoursDesc() {
    this.listMangement.sort((a, b) => b.numberofhours - a.numberofhours);
  }
  navigateToUpdateTask(taskId: number): void {
    this.router.navigate(['/back/update', taskId]);
  }
  sortByNearestDate() {
    this.listMangement.sort((a: any, b: any) => {
      return new Date(a.jobExpirationDate).getTime() - new Date(b.jobExpirationDate).getTime();
    });
  }

  // Méthode pour trier par date la plus lointaine
  sortByFurthestDate() {
    this.listMangement.sort((a: any, b: any) => {
      return new Date(b.jobExpirationDate).getTime() - new Date(a.jobExpirationDate).getTime();
    });
  }
  deleteTask(taskId: number): void {
    this.activityService.deleteActivityManagement(taskId).subscribe({
      next: () => {
        console.log('Task deleted successfully!');
        this.fetchTasks();
      },
      error: (err: any) => {
        console.error('Error deleting task:', err);
      }
    });
  }
  viewTasksDetails(taskId: number): void{
    console.log('Task ID:', taskId);
    this.router.navigate(['/back/getById', taskId]);
  }

  fetchConsultants() {
    this.consultantService.getAllConsultants().subscribe({
      next: (data) => {
        console.log('All consultants:', data);
        this.consultants = data;
      },
      error: (error) => console.log(error)
    });
  }
  fetchData() {
    forkJoin({
      tasks: this.activityService.getAllActivityManagement(),
      consultants: this.consultantService.getAllConsultants()
    }).subscribe(({ tasks, consultants }) => {
      console.log('Tasks:', tasks);
      console.log('Consultants:', consultants);

      this.listMangement = tasks;
      this.consultants = consultants.filter(consultant =>
        consultant.availability !== 'notAvailable'
      );

      console.log('Filtered Consultants:', this.consultants);

      const availableSkills = new Set<string>();
      this.consultants.forEach(consultant => {
        consultant.skills.forEach(skill => {
          availableSkills.add(skill);
        });
      });

      console.log('Available Skills:', availableSkills);


    }, error => {
      console.error('Error fetching data:', error);
    });
  }

  assignTaskToConsultant(taskId: number) {
    if (this.selectedConsultantId) {
      this.activityService.assignTaskToConsultant(taskId, this.selectedConsultantId).subscribe(
        () => {
          console.log('Task assigned to consultant successfully!');
          this.fetchData();
        },
        (error: any) => {
          console.error('Error assigning task to consultant:', error);
        }
      );
    } else {
      console.error('No consultant selected!');
    }
  }

}
