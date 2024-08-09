import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from "../../_services/tasks.service";
import { Tasks } from "../../_models/tasks";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-tasks-teams',
  templateUrl: './update-tasks-teams.component.html',
  styleUrls: ['./update-tasks-teams.component.css']
})
export class UpdateTasksTeamsComponent implements OnInit {
  taskId: number;
  task!: Tasks;
  taskForm!: FormGroup;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      descriptionTasks: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]),
      recipientTasks: new FormControl({ value: '', disabled: true }, Validators.required),
      emailRecipient: new FormControl({ value: '', disabled: true }, Validators.required),
      priority: new FormControl({ value: '', disabled: true }, Validators.required),
      dateAjout: new FormControl({ value: '', disabled: true }, Validators.required),
      status: new FormControl('', Validators.required)
    });

    this.loadTask();
  }

  loadTask() {
    this.tasksService.getTaskById(this.taskId).subscribe(
      task => {
        this.task = task;
        const formattedDate = new Date(task.dateAjout).toISOString().split('T')[0];
        this.taskForm.patchValue({
          descriptionTasks: task.descriptionTasks,
          recipientTasks: task.recipientTasks,
          emailRecipient: task.emailRecipient,
          priority: task.priority,
          dateAjout: formattedDate,
          status: task.status
        });
      },
      error => {
        console.error('Error loading task:', error);
      }
    );
  }

  updateTask() {
    if (this.taskForm.valid) {
      // Créer un objet de tâche avec toutes les propriétés, puis mettre à jour uniquement le champ de statut
      const updatedTask: Tasks = {
        idTasks: this.taskId,
        descriptionTasks: this.task.descriptionTasks,
        recipientTasks: this.task.recipientTasks,
        emailRecipient: this.task.emailRecipient,
        priority: this.task.priority,
        dateAjout: this.task.dateAjout,
        status: this.taskForm.get('status')!.value, // Mise à jour du champ de statut uniquement
        users: []
      };

      this.tasksService.updateTask(updatedTask, this.taskId).subscribe(
        () => {
          console.log('Status updated successfully');
          this.router.navigate(['/back/tasksteams']);
        },
        error => {
          console.error('Error updating status:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
