import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TrainingService } from 'src/app/_services/training.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  trainingsCountPerMonth: { month: string, count: number }[] = [];
  @ViewChild('scoreChart') scoreChart!: ElementRef;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.trainingService.getTrainingsCountPerMonth().subscribe(
      counts => {
        this.trainingsCountPerMonth = counts;
        this.renderChart();
      },
      error => console.error('Error fetching trainings count per month:', error)
    );
  }

  renderChart(): void {
    const ctx = this.scoreChart.nativeElement.getContext('2d');
    const labels = this.trainingsCountPerMonth.map(item => item.month);
    const data = this.trainingsCountPerMonth.map(item => item.count);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Nombre de formations par mois',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2
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
