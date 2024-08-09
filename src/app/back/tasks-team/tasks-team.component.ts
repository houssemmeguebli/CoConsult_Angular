import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from "../../_services/tasks.service";
import { Tasks } from "../../_models/tasks";import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';

@Component({
  selector: 'app-tasks-team',
  templateUrl: './tasks-team.component.html',
  styleUrls: ['./tasks-team.component.css']
})
export class TasksTeamComponent implements OnInit {
  currentUserEmail: string = ''; // Variable pour stocker l'email de l'utilisateur connecté
  tasks: Tasks[] = [];
  useremail!:string;

  constructor(private tasksService: TasksService, private router: Router,private authService: AuthenticationService) {}

  ngOnInit(): void {
    // Récupérer l'email de l'utilisateur connecté depuis sessionStorage ou un service d'authentification
    this.currentUserEmail = sessionStorage.getItem('currentUserEmail') || '';
    this.useremail =this.authService.logDecodedTokenmail();
    // Charger les tâches associées à l'email de l'utilisateur
    this.loadUserTasks();
  }

  loadUserTasks() {
    this.tasksService.getByEmail(this.useremail).subscribe(
      tasks => {
        this.tasks = tasks;
      },
      error => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  goToUpdateTask(taskId: number) {
    // Rediriger vers la page de mise à jour de la tâche avec l'ID de la tâche
    this.router.navigate(['/back/update-task-team', taskId]);
  }
}
