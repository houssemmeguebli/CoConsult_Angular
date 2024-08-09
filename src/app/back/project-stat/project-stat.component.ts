import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Project } from '../../_models/project';
import { ProjectService } from '../../_services/project.service';
import {AuthenticationService} from "../../_services/authentication/authentication.service";

@Component({
  selector: 'app-project-stat',
  templateUrl: './project-stat.component.html',
  styleUrls: ['./project-stat.component.css']
})
export class ProjectStatComponent implements OnInit, AfterViewInit {
  @ViewChild('projectChart') projectChartRef!: ElementRef<HTMLCanvasElement>;
  projectChart!: Chart;
  id:  number= this.authService.logDecodedTokenId();
  projects: Project[] = [];

  constructor(private projectService: ProjectService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  ngAfterViewInit(): void {
    this.createProjectChart();
  }

  loadProjects(): void {
    this.projectService.getAllProjectsByUserId(this.id).subscribe(
      (data: Project[]) => {
        this.projects = data;
        this.createProjectChart(); // Appel de createProjectChart une fois que les données sont chargées
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  createProjectChart(): void {
    if (!this.projects || this.projects.length === 0) {
      console.error('Aucun projet trouvé.');
      return;
    }

    const ctx = this.projectChartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Impossible de récupérer le contexte 2D du canvas.');
      return;
    }

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const projectsByMonth = Array(12).fill(0);

    this.projects.forEach(project => {
      const startDate = new Date(project.startDate);
      const monthIndex = startDate.getMonth();
      projectsByMonth[monthIndex]++;
    });

    if (this.projectChart) {
      this.projectChart.destroy(); // Détruire le graphique existant pour éviter les conflits
    }

    this.projectChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'Projects numbers',
          data: projectsByMonth,
          backgroundColor: 'rgb(5,112,119)',
          borderColor: 'rgb(5,112,119)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
