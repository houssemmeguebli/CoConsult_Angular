import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback, FeedbackGiven, Role } from '../_models/feedback';
import { FeedbackService } from '../_services/feedback.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-feedbackadd',
  templateUrl: './feedbackadd.component.html',
  styleUrls: ['./feedbackadd.component.css']
})
export class FeedbackaddComponent implements OnInit {
  aFormGroup!: FormGroup;

  feedback: Feedback = new Feedback();
  roles: Role[] = Object.values(Role);
  feedbackOptions: FeedbackGiven[] = Object.values(FeedbackGiven);
  feedbackDate!: string;
  formSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
    this.route.params.subscribe(params => {
      this.feedback.reportId = +params['id'];
    });

    this.route.params.subscribe(params => {
      this.feedback.consultantName = params['consultantName'];
    });
    this.setFeedbackDate();
  }

  setFeedbackDate() {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss');
    if (formattedDate !== null) {
      this.feedbackDate = formattedDate;
    } else {
      console.error("La date formatée est null.");
    }
  }

  add(f: NgForm) {
    if (f.invalid) {
      // If the form is invalid, don't proceed with submission
      this.formSubmitted = true; // Set formSubmitted to true
      return;
    }
    this.feedbackService.addFeedback(this.feedback, this.feedback.reportId, this.feedback.consultantName).subscribe({
      next: () => {
        console.log("Feedback ajouté avec succès !");
        this.router.navigate(['/allFeedbacks']);
      },
      error: (err: any) => console.log(err)
    });
  }

  siteKey: string = "6LeBnZUpAAAAAEDMtn5PQAEpTInPp0rB_fR60D-A";
}
