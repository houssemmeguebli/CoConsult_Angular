import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {ActivatedRoute, Router, Routes} from "@angular/router";
import { InterviewService } from "../../_services/interview.service";
import Swal from "sweetalert2";
import {InterviewComponent} from "../interview/interview.component";

@Component({
  selector: 'app-add-interview',
  templateUrl: './add-interview.component.html',
  styleUrls: ['./add-interview.component.css']
})
export class AddInterviewComponent implements OnInit {

  interviewForm!: FormGroup;
  idJobApp: number = 0; // ID de la candidature associée à l'interview

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private interviewService: InterviewService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.idJobApp = this.route.snapshot.params['id']; // Récupérer l'ID de la candidature depuis l'URL

    this.interviewForm = this.formBuilder.group({
      applicantEmail: ['', Validators.required],
      interviewDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      dateInterview: [null, Validators.required]
    });
  }


  onSubmit(): void {
    if (this.interviewForm.valid) {
      const interviewData = this.interviewForm.value;
      this.interviewService.addInterview(this.idJobApp, interviewData).subscribe(
        (response: any) => {
          console.log('Interview added successfully.');

          this.interviewForm.reset();
          this.router.navigate(['/back/interview/', this.idJobApp]);

          Swal.fire({
            title: "Success!",
            text: "Interview added successfully!",
            icon: "success"
          })

        },

        error => {
          console.error('Error adding interview:', error);
          this.interviewForm.reset();
        }
      );
    }
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
