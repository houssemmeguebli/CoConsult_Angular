import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Contrats } from "../../_models/contrats";
import { ContratService } from "../../_services/contrat.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-contrats',
  templateUrl: './contrats.component.html',
  styleUrls: ['./contrats.component.css']
})
export class ContratsComponent implements OnInit {
  contrats: Contrats[] = [];
  searchTerm: string = '';
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize: number = 10;
  currentPage: number = 0;
  dataSource!: MatTableDataSource<Contrats>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private contratService: ContratService, private router: Router) { }

  ngOnInit(): void {
    this.loadContrats();
  }

  loadContrats() {
    this.contratService.getAllContrats().subscribe(
      contrats => {
        this.contrats = contrats;
        this.dataSource = new MatTableDataSource<Contrats>(this.contrats);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.error('Error loading contrats:', error);
      }
    );
  }

  viewContrat(contrat: Contrats) {
    console.log('View contract:', contrat);
  }

  deleteContrat(id: number) {
    if (confirm('Are you sure you want to delete this contract?')) {
      this.contratService.deleteContrat(id).subscribe(
        () => {
          this.contrats = this.contrats.filter(contrat => contrat.idContrat !== id);
          this.dataSource = new MatTableDataSource<Contrats>(this.contrats);
          this.dataSource.paginator = this.paginator;
        },
        error => {
          console.error('Error deleting contract:', error);
        }
      );
    }
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  filterContrats() {
    return this.contrats
      .filter(contrat =>
        contrat.projectName.toLowerCase().includes(this.searchTerm.toLowerCase())
        && new Date(contrat.endDate) >= new Date() // Filter contracts with end date not passed
      )
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }

  exportToExcel() {
    const filteredContrats: Contrats[] = this.filterContrats();
    const content: string[][] = [];
    const headerRow: string[] = ['Description', 'Start Date', 'End Date', 'Project Name', 'Email', 'Etat'];
    content.push(headerRow);

    filteredContrats.forEach(contrat => {
      const row: string[] = [
        contrat.description,
        contrat.startDate.toString(),
        contrat.endDate.toString(),
        contrat.projectName,
        contrat.email,
        contrat.etat
      ];
      content.push(row);
    });

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(content);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contrats');

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(data, 'contrats_export.xlsx');
  }
}
