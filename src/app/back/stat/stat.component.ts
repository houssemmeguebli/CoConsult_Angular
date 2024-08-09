import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input} from '@angular/core';
import { JobApplicationService } from "../../_services/job-application.service";
import { JobOfferService } from "../../_services/job-offer.service";
import { JobApplication } from "../../_models/job-application";
import { JobOffer } from "../../_models/job-offer";
import Chart from 'chart.js/auto';
import {Project} from "../../_models/project";
import "chart.js/auto";

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit, AfterViewInit {

  jobApplications: JobApplication[] = [];
  jobOffers: JobOffer[] = [];
  jobApplicationsMap = new Map<string, number>();
  totalJobOffers: number = 0;

  // Références aux éléments du DOM pour les graphiques
  @ViewChild('myChart') myChartRef!: ElementRef;
  @ViewChild('doughnutChart') doughnutChartRef!: ElementRef;
  @ViewChild('projectChart') projectChartRef!: ElementRef<HTMLCanvasElement>;
  projectChart!: Chart;

  projects!: Project[];


  applicationStatsText: string = '';
  totalJobOffersText: string = '';

  constructor(
    private jobApplicationService: JobApplicationService,
    private jobOfferService: JobOfferService
  ) {
  }

  ngOnInit(): void {
    this.getJobApplications();
    this.getJobOffers();


  }

  ngAfterViewInit(): void {
    this.getJobOffersCount();

  }

  // Récupérer les applications d'emploi
  getJobApplications(): void {
    this.jobApplicationService.getAllJobApplications()
      .subscribe(jobApplications => {
        this.jobApplications = jobApplications;
        this.countApplicationsByJobOffer();
        this.createChart();
        // Mettre à jour les interprétations des données
        this.updateApplicationStatsText();
      });
  }

  // Récupérer les offres d'emploi
  getJobOffers(): void {
    this.jobOfferService.findAllJobOffers()
      .subscribe(jobOffers => {
        this.jobOffers = jobOffers;
        // Mettre à jour les interprétations des données
        this.updateTotalJobOffersText();
      });
  }

  // Compter le nombre d'applications pour chaque offre d'emploi
  countApplicationsByJobOffer(): void {
    this.jobOffers.forEach(offer => {
      const count = this.jobApplications.filter(app => app.jobOffer.idJobOffer === offer.idJobOffer).length;
      this.jobApplicationsMap.set(offer.jobName, count);
    });
  }

  // Créer le graphique des applications pour chaque offre d'emploi
  createChart(): void {
    const ctx = this.myChartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Array.from(this.jobApplicationsMap.keys()),
        datasets: [{
          label: 'Number of Applications',
          data: Array.from(this.jobApplicationsMap.values()),
          backgroundColor: 'rgba(12,188,199,0.86)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });
  }

  // Mettre à jour l'interprétation du nombre d'applications
  updateApplicationStatsText(): void {
    let maxApplications = 0;
    let mostAppliedJob = '';
    this.jobApplicationsMap.forEach((count, jobName) => {
      if (count > maxApplications) {
        maxApplications = count;
        mostAppliedJob = jobName;
      }
    });
    this.applicationStatsText = `The job "${mostAppliedJob}" received the most applications (${maxApplications} applications).`;
  }

  // Mettre à jour l'interprétation du nombre total d'offres d'emploi
  getJobOffersCount(): void {
    this.jobOfferService.findAllJobOffers().subscribe(offers => {
      this.totalJobOffers = offers.length;
      this.updateTotalJobOffersText(); // Mettre à jour le texte une fois que le nombre d'offres est disponible
      this.createChart(); // Créer le graphique une fois que le nombre d'offres est disponible
    });
  }

  updateTotalJobOffersText(): void {
    this.totalJobOffersText = `There are currently ${this.totalJobOffers} job offers available.`;
  }


  /*
  createProjectChart(): void {

    if (!this.projects || this.projects.length === 0) {
      return;
    }

    const ctx = this.projectChartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Impossible de récupérer le contexte 2D du canvas.');
      return;
    }

    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const projectsByMonth = Array(12).fill(0);

    this.projects.forEach(project => {
      const startDate = new Date(project.startDate);
      const monthIndex = startDate.getMonth();
      projectsByMonth[monthIndex]++;
    });

    this.projectChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'Nombre de projets',
          data: projectsByMonth,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
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

   */
}


