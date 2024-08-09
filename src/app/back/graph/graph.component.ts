import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

interface GenderData {
  gender: string;
  count: number;
}

interface DepartmentData {
  departmentName: string; // Modifier pour correspondre à la clé réelle dans les données
  count: number;
}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  departmentNames: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getGenderChartData();
    this.getDepartmentChartData();
  }

  getGenderChartData(): void {
    // Appel à l'API pour récupérer les données du backend pour les statistiques par genre
    this.http.get<GenderData[]>('http://localhost:8081/stat/gender').subscribe(
      data => {
        const labels = data.map(item => item.gender);
        const counts = data.map(item => item.count);

        this.createGenderChart(labels, counts);
      },
      error => {
        console.error('Error fetching gender data:', error);
      }
    );
  }

  getDepartmentChartData(): void {
    // Appel à l'API pour récupérer les données du backend pour les statistiques par département
    this.http.get<DepartmentData[]>('http://localhost:8081/stat/department').subscribe(
      data => {
        console.log(data);
            this.departmentNames = data.map(item => item.departmentName);
             const labels = data.map(item => item.departmentName);
             const counts = data.map(item => item.count);
             console.log(this.departmentNames);


        this.createDepartmentChart(labels, counts);
      },
      error => {
        console.error('Error fetching department data:', error);
      }
    );
  }
  extractData(data: any[]): { labels: string[], counts: number[] } {
    const labels = data.map(item => item.department);
    const counts = data.map(item => item.count);
    return { labels, counts };
  }

  createGenderChart(labels: string[], counts: number[]): void {
    // Création du graphique en barres pour les statistiques par genre
    const ctx = document.getElementById('genderChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Gender', // Changer le libellé pour afficher "Gender"
          data: counts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1 // Définit l'intervalle entre chaque valeur sur l'axe y à 1 pour des valeurs entières
            }
          }
        }
      }
    });
  }
  
  createDepartmentChart(labels: string[], counts: number[]): void {
    const ctx = document.getElementById('departmentChart') as HTMLCanvasElement;
    const departmentChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: '# of Users by Department', // Conserver le libellé existant pour afficher "# of Users by Department"
          data: counts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.formattedValue || '';
                return `${label}: ${value}`;
              }
            }
          }
        }
      }
    });
  }
}  