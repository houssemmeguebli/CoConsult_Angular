import { Component, OnInit } from '@angular/core';
import { Feedback } from '../_models/feedback';
import { FeedbackService } from '../_services/feedback.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-list-feedbacks',
  templateUrl: './list-feedbacks.component.html',
  styleUrls: ['./list-feedbacks.component.css']
})
export class ListFeedbacksComponent implements OnInit {
  listfeedbacks: Feedback[] = [];
  consultantScores: { [key: string]: number } = {};
  sortedConsultantScores: [string, number][] = [];
  feedback!: string;
  constructor(private feedbackService: FeedbackService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.fetchFeedbacks();
  }

  fetchFeedbacks() {
    this.feedbackService.getAllFeedbacks().subscribe({
      next: (data) => {
        this.listfeedbacks = data;
        this.calculateConsultantScores();
        this.renderChart();
      },
      error: (error) => console.log(error),
      complete: () => console.log('done')
    });
  }

  calculateConsultantScores(): void {
    this.consultantScores = {};
    this.listfeedbacks.forEach((feedback) => {
      const consultantName = feedback.consultantName;
      const rating = feedback.rating;

      if (!this.consultantScores[consultantName]) {
        this.consultantScores[consultantName] = rating;
      } else {
        this.consultantScores[consultantName] += rating;
      }
    });

    Object.keys(this.consultantScores).forEach((consultantName) => {
      const totalReports = this.listfeedbacks.filter((feedback) => feedback.consultantName === consultantName).length;
      this.consultantScores[consultantName] /= totalReports;
    });
  }

  renderChart(): void {
    const ctx = document.getElementById('scoreChart') as HTMLCanvasElement;
    const consultantNames = Object.keys(this.consultantScores);
    const consultantScores = Object.values(this.consultantScores);

    // Generate random colors for each bar
    const backgroundColors = consultantNames.map(() => '#' + ((Math.random() * 0xFFFFFF) << 0).toString(16).padStart(6, '0'));

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: consultantNames,
        datasets: [{
          label: 'Consultant Scores',
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



  sortScoresAscending(): void {
    this.sortedConsultantScores = Object.entries(this.consultantScores).sort((a, b) => {
      return a[1] - b[1];
    });
  }

  sortScoresDescending(): void {
    this.sortedConsultantScores = Object.entries(this.consultantScores).sort((a, b) => {
      return b[1] - a[1];
    });
  }

  deleteFeedback(id: number): void {
    this.feedbackService.deleteFeedback(id).subscribe({
      next: () => {
        console.log('feedback deleted successfully!');
        this.fetchFeedbacks();
      },
      error: (err: any) => {
        console.error('Error deleting feedback:', err);
      }
    });
  }
}
