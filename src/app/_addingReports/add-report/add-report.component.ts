import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddingReport } from 'src/app/_models/AddingReport';
import { AddingReportsService } from 'src/app/_services/adding-reports.service';
import { Consultant } from 'src/app/_models/Consultant';
import { ConsultantService } from 'src/app/_services/consultant.service';
@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit {
  aFormGroup!: FormGroup;
  formSubmitted: boolean = false;


  report: AddingReport = new AddingReport();
  consultantNames: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private reportService: AddingReportsService,
    private router: Router,
   private consultService: ConsultantService,
  ) {}

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
    this.consultService.getConsultantsNames().subscribe(names => {
      this.consultantNames = names;
    });
  }

  add(f: NgForm) {
    if (f.invalid) {
      // If the form is invalid, don't proceed with submission
      this.formSubmitted = true; // Set formSubmitted to true
      return;
    }
    console.log(this.report);
    this.reportService.addReport(this.report).subscribe({
      next: () => {
        console.log("Report added successfully!");
        this.router.navigate(['/getAllReports']);
      },
      error: (err: any) => console.log(err)
    });
  }
  siteKey : string="6LeBnZUpAAAAAEDMtn5PQAEpTInPp0rB_fR60D-A";
}
