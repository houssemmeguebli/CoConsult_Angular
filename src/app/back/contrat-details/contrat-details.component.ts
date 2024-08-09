import { Component, ElementRef, ViewChild } from '@angular/core';
import { Contrats } from "../../_models/contrats";
import { ContratService } from "../../_services/contrat.service";
import { ActivatedRoute } from "@angular/router";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-contrat-details',
  templateUrl: './contrat-details.component.html',
  styleUrls: ['./contrat-details.component.css']
})
export class ContratDetailsComponent {
  @ViewChild('content', { static: true }) content?: ElementRef;
  contrat!: Contrats;

  constructor(
    private route: ActivatedRoute,
    private contratService: ContratService
  ) { }

  ngOnInit(): void {
    this.getContratDetails();
  }

  printAsPDF(): void {
    const doc = new jsPDF();

    const element = document.querySelector('.contract-details-container');
    if (!element) {
      console.error('Element .contract-details-container not found.');
      return;
    }

    html2canvas(<HTMLElement>element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // Largeur de la page A4 en mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('details_contrat.pdf');
    });
  }

  getContratDetails(): void {
    const id = this.route.snapshot.params['id'];
    this.contratService.getContratById(id).subscribe(contrat => this.contrat = contrat);
  }
}
