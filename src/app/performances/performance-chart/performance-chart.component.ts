import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../../_services/performance.service';
import { Performance } from '../../_models/performance';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.css']
})
export class PerformanceChartComponent implements OnInit {
  performances: Performance[] = [];
  selectedDay: string | null = null; // Property to store the selected day
  pieChartData: { name: string, value: number }[] = []; // Data for pie chart
  showpie: boolean = false;
  showchart: boolean = false;
  currentMonth: Date = new Date(); // Current month
  calendarDays: Date[] = []; 
  // Configuration du graphique à barres
  view: [number, number] = [700, 400];
  userId=12;

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Jour';
  showYAxisLabel = true;
  yAxisLabel = 'Nombre d\'heures';
  colorScheme: Color = {
    name: 'customColorScheme', // nom facultatif
    selectable: true, // facultatif
    group: ScaleType.Ordinal, // Utilisez ScaleType.Ordinal
    domain: ['#057077', '#f25c05', '#AAAAAA']
  };
  

  constructor(private performanceService: PerformanceService, private datePipe: DatePipe) { 
    this.generateCalendar();

  }

  showPieForDay(day: Date): void {
    this.selectedDay = this.datePipe.transform(day, 'yyyy-MM-dd');
    this.updatePieChartData();
    this.showpie = true;
  }
  
  ngOnInit(): void {
    this.loadPerformances();
  }
  // Generate days for the current month
  generateCalendar(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    this.calendarDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      this.calendarDays.push(new Date(year, month, i));
    }
  }

  // Check if a day is a performance day
  isPerformanceDay(day: Date): boolean {
    const formattedDay = this.datePipe.transform(day, 'yyyy-MM-dd');
    return this.performances.some(performance =>
      this.datePipe.transform(performance.performanceDay, 'yyyy-MM-dd') === formattedDay
    );
  }

  // Navigate to the previous month
  previousMonth(): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
    this.generateCalendar();
  }
  
  // Navigate to the next month
  nextMonth(): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    this.generateCalendar();
  }

  // Method to calculate the percentage
  calculatePercentage(nbHours: number): number {
    return (nbHours / 8) * 100;
  }

  showChart(): void {
    this.showchart = true;
  }

  getAverageHoursExcludingWeekends(): number {
    let totalHours = 0;
    let totalWeekdays = 0;

    this.performances.forEach(performance => {
      const performanceDay = new Date(performance.performanceDay);
      // Check if the day is not Saturday (6) or Sunday (0)
      if (performanceDay.getDay() !== 6 && performanceDay.getDay() !== 0) {
        totalHours += performance.nbHours;
        totalWeekdays++;
      }
    });

    // Avoid division by zero
    if (totalWeekdays === 0) {
      return 0;
    }

    // Calculate the average hours excluding weekends
    const averageHours = totalHours / totalWeekdays;

    // Return the average hours rounded to two decimal places
    return parseFloat(averageHours.toFixed(2));
  }

  // Method to update pie chart data
  updatePieChartData(): void {
    // Find the selected day's performance
    const selectedPerformance = this.performances.find(performance => {
      return this.datePipe.transform(performance.performanceDay, 'yyyy-MM-dd') === this.selectedDay;
    });

    if (selectedPerformance) {
      const percentage = this.calculatePercentage(selectedPerformance.nbHours);
      this.pieChartData = [
        { name: 'Hours Worked: ' + percentage.toFixed(2) + '%', value: percentage },
        { name: 'Remaining Hours: ' + (100 - percentage).toFixed(2) + '%', value: 100 - percentage }
      ];
    } else {
      this.pieChartData = []; // Reset data if no performance found for the selected day
    }
  }

  loadPerformances(): void {
    this.performanceService.getPerformances().subscribe(performances => {
      this.performances = performances;
    });
  }
  
  showPie(performance: Performance): void {
    this.selectedDay = this.datePipe.transform(performance.performanceDay, 'yyyy-MM-dd');
    this.updatePieChartData();
    this.showpie = true;
  }

  // Fonction pour formater les données pour le graphique
  formatData(performances: Performance[]): any[] {
    // Map performances to { name: string, value: number }
    return performances.map(performance => {
      return {
        name: this.datePipe.transform(performance.performanceDay, 'yyyy-MM-dd'), // Format as needed
        value: performance.nbHours
      };
    });
  }
  
}
