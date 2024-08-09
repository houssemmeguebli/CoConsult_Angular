// task-tracker.component.ts
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { Consultant } from 'src/app/_models/Consultant';

@Component({
  selector: 'app-task-tracker',
  templateUrl: './task-tracker.component.html',
  styleUrls: ['./task-tracker.component.css']
})
export class TaskTrackerComponent implements OnInit {
  consultants: Consultant[] = [];
  tasksCompleted: number = 0;
  score: number = 0;
  tasksAssignedByWeek: { [key: string]: number } = {};
  tasksCompletedByWeek: { [key: string]: number } = {};

  constructor(private consultantService: ConsultantService) {}

  ngOnInit(): void {
    this.fetchConsultants();
  }

  fetchConsultants() {
    this.consultantService.getAllConsultantsWithTasks().subscribe({
      next: (data: Consultant[]) => {
        this.consultants = data;
        this.calculateTasksCompleted();
        this.calculateTasksStatistics();
        this.renderScoreChart()
        this.renderChartsForConsultants();
this.renderCompletedTasksChart();
      },
      error: (error) => console.log(error)
    });
  }
  calculateTasksStatistics() {
    this.tasksAssignedByWeek = {};
    this.tasksCompletedByWeek = {};

    this.consultants.forEach(consultant => {
      const tasksAssignedByWeek: { [key: string]: number } = {};

      consultant.tasks.forEach(task => {
        const taskWeek = this.getWeekNumber(task.creationDate);

        if (!tasksAssignedByWeek[taskWeek]) {
          tasksAssignedByWeek[taskWeek] = 1;
        } else {
          tasksAssignedByWeek[taskWeek]++;
        }
        if (task.completed) {
          if (!this.tasksCompletedByWeek[taskWeek]) {
            this.tasksCompletedByWeek[taskWeek] = 1;
          } else {
            this.tasksCompletedByWeek[taskWeek]++;
          }
        }
      });

      Object.keys(tasksAssignedByWeek).forEach(week => {
        if (!this.tasksAssignedByWeek[week]) {
          this.tasksAssignedByWeek[week] = tasksAssignedByWeek[week];
        } else {
          this.tasksAssignedByWeek[week] += tasksAssignedByWeek[week];
        }
      });
    });
  }

  getWeekNumber(date: Date): string {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
    return `${d.getFullYear()}-W${weekNo}`;
  }
  calculateTasksCompleted() {
    this.consultants.forEach(consultant => {
      if (consultant['tasks']) {
        consultant.tasksTotal = consultant['tasks'].length;
        consultant.tasksCompleted = consultant['tasks'].filter((task: Task) => task.completed).length;
      }
    });
  }

  taskCompleted(task: Task, consultant: Consultant): void {
    if (!task.completed) {
      task.completed = true;
      if (consultant.tasksCompleted !== undefined) {
        consultant.tasksCompleted++;
      }
      this.tasksCompleted++;
      this.score += 5;

      if (this.score === 100) {
        this.tasksCompleted = 0;
      }
    }
  }
  renderScoreChart(): void {
    const ctx = document.getElementById('generalScoreChart') as HTMLCanvasElement;
    const consultantNames = this.consultants.map(consultant => consultant.name);
    const consultantScores = this.consultants.map(consultant => (consultant.tasksCompleted !== undefined ? consultant.tasksCompleted : 0) * 5);

    const backgroundColors = consultantNames.map(() => '#' + ((Math.random() * 0xFFFFFF) << 0).toString(16).padStart(6, '0'));

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: consultantNames,
        datasets: [{
          label: 'Score by Consultant',
          data: consultantScores,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true
          }
        }
      }
    });
}
// renderScoreChart(): void {
//   const ctx = document.getElementById('generalScoreChart') as HTMLCanvasElement;
//   const consultantNames = this.consultants.map(consultant => consultant.name);
//   const consultantTasksCompleted = this.consultants.map(consultant => (consultant.tasksCompleted !== undefined ? consultant.tasksCompleted : 0));

//   const backgroundColors = consultantNames.map(() => '#' + ((Math.random() * 0xFFFFFF) << 0).toString(16).padStart(6, '0'));

//   new Chart(ctx, {
//     type: 'pie',
//     data: {
//       labels: consultantNames,
//       datasets: [{
//         label: 'Score by Consultant',
//         data: consultantTasksCompleted,
//         backgroundColor: backgroundColors,
//         borderColor: backgroundColors,
//         borderWidth: 1
//       }]
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false
//     }
//   });
// }



renderChartsForConsultants(): void {
  this.consultants.forEach(consultant => {
    const ctx = document.createElement('canvas') as HTMLCanvasElement;
    const consultantTasks = consultant.tasks.length;

    const chartContainer = document.createElement('div');
    chartContainer.classList.add('chart-container');

    chartContainer.appendChild(ctx);
    document.getElementById('consultantCharts')?.appendChild(chartContainer);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Tasks Assigned'],
        datasets: [{
          label: consultant.name,
          data: [consultantTasks],
          backgroundColor: '#' + ((Math.random() * 0xFFFFFF) << 0).toString(16).padStart(6, '0'),
          borderColor: '#' + ((Math.random() * 0xFFFFFF) << 0).toString(16).padStart(6, '0'),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  });
}



renderCompletedTasksChart(): void {
  const ctx = document.getElementById('completedTasksChart') as HTMLCanvasElement;
  const consultantNames = this.consultants.map(consultant => consultant.name);
  const completedTasks = this.consultants.map(consultant => (consultant.tasksCompleted !== undefined ? consultant.tasksCompleted : 0));

  const backgroundColors = consultantNames.map(() => '#' + ((Math.random() * 0xFFFFFF) << 0).toString(16).padStart(6, '0'));

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: consultantNames,
      datasets: [{
        label: 'Completed Tasks by Consultant',
        data: completedTasks,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          type: 'linear',
          beginAtZero: true,
          ticks: {
            stepSize: 1 // Set the step size to 1 for integer values
          }
        }
      }
    }
  });
}





}

interface Task {
  id: number;
  name: string;
  completed: boolean;
  creationDate: Date;
}
