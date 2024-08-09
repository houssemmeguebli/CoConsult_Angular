import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Tasks } from '../../_models/tasks';
import Chart from 'chart.js/auto';
import { TasksService } from '../../_services/tasks.service'; // Import du service

@Component({
  selector: 'app-statistique-tasks',
  templateUrl: './statistique-tasks.component.html',
  styleUrls: ['./statistique-tasks.component.css']
})
export class StatistiqueTasksComponent implements OnInit {
  @Input() tasks: Tasks[] = [];
  tasksEnAttenteCount: number = 0;
  tasksTermineesCount: number = 0;

  @ViewChild('chart', { static: true }) chartRef!: ElementRef<HTMLCanvasElement>;
  chart: any;

  constructor(private tasksService: TasksService) { } // Injection du service

  ngOnInit(): void {
    this.loadTasks(); // Charger les tâches depuis le service
  }

  loadTasks() {
    this.tasksService.getAllTasks().subscribe(
      tasks => {
        this.tasks = tasks;
        this.calculateStats();
        this.renderChart();
      },
      error => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  calculateStats() {
    this.tasksEnAttenteCount = this.tasks.filter(task => task.status === 'en_Attente').length;
    this.tasksTermineesCount = this.tasks.filter(task => task.status === 'terminé').length;
  }

  renderChart() {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Impossible de récupérer le contexte du canvas');
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['En attente', 'Terminées'],
        datasets: [{
          label: 'Statistiques des tâches',
          data: [this.tasksEnAttenteCount, this.tasksTermineesCount],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
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
