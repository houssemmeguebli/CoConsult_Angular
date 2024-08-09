import { Component } from '@angular/core';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { ActivityManagement } from 'src/app/_models/ActivityManagement';

@Component({
  selector: 'app-task-progress',
  templateUrl: './task-progress.component.html',
  styleUrls: ['./task-progress.component.css']
})
export class TaskProgressFrontComponent {
  selectedConsultant: string = '';
  consultantTasks: ActivityManagement[] = [];


  constructor(private consultantService: ConsultantService) { }

  ngOnInit(): void {
    this.getTasksByConsultant();
  }

  getTasksByConsultant(): void {
    if (this.selectedConsultant) {
      this.consultantService.getTasksByConsultant(this.selectedConsultant)
        .subscribe((consultantTasks: ActivityManagement[]) => {
          this.consultantTasks = consultantTasks;
        });
    }
  }

  searchTasks(): void {
    this.consultantService.getTasksByConsultant(this.selectedConsultant)
      .subscribe(consultantTasks => {
        this.consultantTasks = consultantTasks;
      });
  }

  toggleTaskCompletion(consultantTasks: ActivityManagement): void {
    consultantTasks.completed = !consultantTasks.completed;
  }

  submitCompletedTasks(): void {
    const completedTasks = this.consultantTasks.filter(task => task.completed);
    completedTasks.forEach(task => {
      this.consultantService.updateTask(this.selectedConsultant, task.idActivityManagement, task).subscribe(() => {
        console.log(`Tâche ${task.jobName} marquée comme terminée.`);
      }, (error: any) => {
        console.error(`Erreur lors de la mise à jour de la tâche ${task.jobName}:`, error);
      });
    });
}

}
