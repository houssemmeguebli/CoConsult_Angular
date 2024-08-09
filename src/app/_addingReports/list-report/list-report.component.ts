import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddingReport } from 'src/app/_models/AddingReport';
import { AddingReportsService } from 'src/app/_services/adding-reports.service';
@Component({
  selector: 'app-list-report',
  templateUrl: './list-report.component.html',
  styleUrls: ['./list-report.component.css']
})
export class ListReportComponent {

  listReprt: AddingReport[] = [];
  report!:string;
  constructor(private reportService: AddingReportsService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.fetchReports();
  }

  fetchReports() {
    this.reportService.getAllRepots().subscribe({
      next: (data) => this.listReprt = data,
      error: (error) => console.log(error),
      complete: () => console.log('done')
    });
  }

  navigateToUpdateReport(reportId: number): void {
    this.router.navigate(['/updateReport', reportId]);
  }

  deleteReport(reportId: number): void {
    this.reportService.deleteReport(reportId).subscribe({
      next: () => {
        console.log('Report deleted successfully!');
        this.fetchReports();
      },
      error: (err: any) => {
        console.error('Error deleting report:', err);
      }
    });
  }

  viewReportDetails(reportId: number): void{
    console.log('Report ID:', reportId);
    this.router.navigate(['/getReportById', reportId]);
  }
  navigateToAddFeedback(reportId: number,consultantName:string): void {
    this.router.navigate(['/addFeedback', reportId,consultantName]);
  }
  sortByNearestDate() {
    this.listReprt.sort((a, b) => {
      return new Date(a.addingreportsDate).getTime() - new Date(b.addingreportsDate).getTime();
    });
  }

  sortByFurthestDate() {
    this.listReprt.sort((a, b) => {
      return new Date(b.addingreportsDate).getTime() - new Date(a.addingreportsDate).getTime();
    });
  }

}
