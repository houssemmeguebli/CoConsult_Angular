import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddingReport } from 'src/app/_models/AddingReport';
import { AddingReportsService } from 'src/app/_services/adding-reports.service';
@Component({
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.css']
})
export class DetailReportComponent {
  report: AddingReport = new AddingReport();

  constructor(private reportService: AddingReportsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const trainId = Number(params.get('id'));
      this.reportService.getReportById(trainId).subscribe(report => {
        this.report = report;
      });
    });
  }


  navigateToUpdatereport(trainId: number): void {
    this.router.navigate(['/updateReport', trainId]);
  }

  deleteReport(trainId: number): void {
    this.reportService.deleteReport(trainId).subscribe({
      next: () => {
        console.log('report deleted successfully!');
        this.router.navigate(['/getAllReports']);
      },
      error: (err: any) => {
        console.error('Error deleting report:', err);
      }
    });
  }
}

