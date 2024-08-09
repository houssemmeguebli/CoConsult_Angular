import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from '../../_services/tasks.service';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {
  addTaskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addTaskForm = this.fb.group({
      descriptionTasks: ['', Validators.required],
      recipientTasks: ['', Validators.required],
      emailRecipient: ['', Validators.required],
      priority: ['', Validators.required],
      dateAjout: [new Date(), Validators.required], // Set current date
    });
  }

  addTask() {
    if (this.addTaskForm.valid) {
      // Set status to "en_Attente"
      const taskData = {
        ...this.addTaskForm.value,
        status: 'en_Attente'
      };
      this.tasksService.createTask(taskData).subscribe(
        createdTask => {
          console.log('Task added successfully:', createdTask);
          this.addTaskForm.reset();
          // Redirect to another page after adding the task if needed
           this.router.navigate(['/back/tasks']);
        },
        error => {
          console.error('Error adding task:', error);
        }
      );
    } else {
      console.error('Invalid form data');
    }
  }
}
