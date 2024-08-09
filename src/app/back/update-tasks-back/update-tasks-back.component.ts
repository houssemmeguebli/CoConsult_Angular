import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from "../../_services/tasks.service";
import { Tasks } from "../../_models/tasks";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-tasks-back',
  templateUrl: './update-tasks-back.component.html',
  styleUrls: ['./update-tasks-back.component.css']
})
export class UpdateTasksBackComponent implements OnInit {
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
      descriptionTasks: new FormControl('', [Validators.required, Validators.minLength(6)]),
      recipientTasks: new FormControl('', Validators.required),
      emailRecipient: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      dateAjout: new FormControl('', Validators.required)
    });

    this.loadTask();
  }

  loadTask() {
    this.tasksService.getTaskById(this.taskId).subscribe(
      task => {
        this.task = task;
        // Formatage de la date au format ISO pour le champ de formulaire
        const formattedDate = new Date(task.dateAjout).toISOString().split('T')[0];
        this.taskForm.patchValue({
          descriptionTasks: task.descriptionTasks,
          recipientTasks: task.recipientTasks,
          emailRecipient: task.emailRecipient,
          priority: task.priority,
          dateAjout: formattedDate // Utiliser la date existante de la tâche
        });
      },
      error => {
        console.error('Error loading task:', error);
      }
    );
  }

  updateTask() {
    if (this.taskForm.valid) {
      const updatedTask: Tasks = {
        idTasks: this.taskId,
        ...this.taskForm.value
      };

      this.tasksService.updateTask(updatedTask, this.taskId).subscribe(
        () => {
          console.log('Task updated successfully');
          this.router.navigate(['/back/tasks']); // Redirection vers la page des tâches après la mise à jour
        },
        error => {
          console.error('Error updating task:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
