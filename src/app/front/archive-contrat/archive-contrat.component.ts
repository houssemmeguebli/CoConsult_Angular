import { Component, OnInit } from '@angular/core';
import { Contrats } from "../../_models/contrats";
import { ContratService } from "../../_services/contrat.service";

@Component({
  selector: 'app-archive-contrat',
  templateUrl: './archive-contrat.component.html',
  styleUrls: ['./archive-contrat.component.css']
})
export class ArchiveContratComponent implements OnInit {
  contrats: Contrats[] = [];

  constructor(private contratService: ContratService) { }

  ngOnInit(): void {
    this.loadArchiveContrats();
  }

  loadArchiveContrats() {
    this.contratService.getAllContrats().subscribe(
      contrats => {
        this.contrats = contrats.filter(contrat => new Date(contrat.endDate) < new Date());
      },
      error => {
        console.error('Error loading archive contrats:', error);
      }
    );
  }
}
