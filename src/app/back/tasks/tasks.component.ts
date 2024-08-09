import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from "../../_services/tasks.service";
import { Tasks } from "../../_models/tasks";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Tasks[] = [];

  constructor(
    private tasksService: TasksService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.tasksService.getAllTasks().subscribe(
      tasks => {
        this.tasks = tasks;
      },
      error => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasksService.deleteTask(id).subscribe(
        () => {
          // Remove the deleted task from the list
          this.tasks = this.tasks.filter(task => task.idTasks !== id);
        },
        error => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }

  updateTask(id: number) {
    // Navigate to the update task page with the task ID
    this.router.navigate(['/update-task', id]);
  }
}
