import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContratService } from '../../_services/contrat.service';
import { Contrats } from '../../_models/contrats';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {
  contrats: Contrats[] = [];
  contratActifCount: number = 0;
  contratEnAttenteCount: number = 0;

  @ViewChild('pieChartCanvas') pieChartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private contratService: ContratService) { }

  ngOnInit(): void {
    this.loadContrats();
  }

  loadContrats() {
    this.contratService.getAllContrats().subscribe(
      contrats => {
        // Filtrer les contrats dont la date de fin n'est pas dépassée
        this.contrats = contrats.filter(contrat => new Date(contrat.endDate) >= new Date());
        this.calculateStats();
        this.renderPieChart();
      },
      error => {
        console.error('Error loading contracts:', error);
      }
    );
  }

  calculateStats() {
    this.contratActifCount = this.contrats.filter(contrat => contrat.etat === 'Actif').length;
    this.contratEnAttenteCount = this.contrats.filter(contrat => contrat.etat === 'en_attend' || contrat.etat === null).length;
  }

  renderPieChart() {
    const ctx = this.pieChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Actif', 'En Attente'],
        datasets: [{
          label: 'Contrats',
          data: [this.contratActifCount, this.contratEnAttenteCount],
          backgroundColor: [
            'rgba(0, 102, 204, 0.6)', // Couleur pour les contrats actifs
            'rgba(204, 0, 0, 0.6)' // Couleur pour les contrats en attente
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      }
    });
  }
}
