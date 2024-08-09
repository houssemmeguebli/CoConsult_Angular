import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../_services/project.service";
import dayGridPlugin from '@fullcalendar/daygrid';
import {Project} from "../../_models/project";
import {AuthenticationService} from "../../_services/authentication/authentication.service";

@Component({
  selector: 'app-project-calendar',
  templateUrl: './project-calendar.component.html',
  styleUrls: ['./project-calendar.component.css']
})
export class ProjectCalendarComponent implements OnInit {
  calendarOptions: any;
  isLoading = true; // Gérer l'état de chargement
  id:  number= this.authService.logDecodedTokenId();

  constructor(private projectService: ProjectService,
              private authService: AuthenticationService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjectsByUserId(this.id).subscribe({
      next: (projects: Project[]) => {
        this.calendarOptions = {
          initialView: 'dayGridMonth',
          plugins: [dayGridPlugin],
          events: projects.map(project => ({
            title: project.projectName,
            start: project.startDate,
            end: project.endDate
          }))
        };
        this.isLoading = false; // Mettre à jour l'état de chargement
      },
      error: (error) => {
        console.error('Erreur lors du chargement des projets:', error);
        this.isLoading = false;
      }
    });
  }
}
