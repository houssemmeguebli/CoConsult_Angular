import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddingReport } from 'src/app/_models/AddingReport';
import { AddingReportsService } from 'src/app/_services/adding-reports.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-report',
  templateUrl: './update-report.component.html',
  styleUrls: ['./update-report.component.css']
})
export class UpdateReportComponent {
  aFormGroup!: FormGroup;
  report: AddingReport = new AddingReport();
  id: number;

  constructor(
    private reportService: AddingReportsService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,

  ) {
    this.id = +this.route.snapshot.params['id'];
  }

  update(form: NgForm) {
    if (form.valid) {
      this.reportService.updateReport( this.id,this.report).subscribe({
        next: () => {
          console.log("Task updated successfully!");
          this.router.navigate(['/getAllReports']);
        },
        error: (err) => console.log(err)
      });
    }
  }
  siteKey : string="6LeBnZUpAAAAAEDMtn5PQAEpTInPp0rB_fR60D-A";
}
