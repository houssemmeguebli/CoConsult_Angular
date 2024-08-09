import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InterviewService } from "../../_services/interview.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import * as moment from 'moment';

@Component({
  selector: 'app-interview-update',
  templateUrl: './interview-update.component.html',
  styleUrls: ['./interview-update.component.css']
})
export class InterviewUpdateComponent implements OnInit{

  interviewForm!: FormGroup;
  interviewId: number = 0; // ID de l'interview à mettre à jour
  idd!:number;
  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private interviewService: InterviewService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.interviewId = this.route.snapshot.params['id'];

    // Récupérer les données de l'interview à mettre à jour en fonction de son ID
    this.interviewService.getInterviewById(this.interviewId).subscribe(
      (interviewData) => {
        this.interviewForm.patchValue({
          applicantEmail: interviewData.applicantEmail,
          interviewDescription: interviewData.interviewDescription,
         // dateInterview: interviewData.dateInterview
          dateInterview: moment(interviewData.dateInterview).format('YYYY-MM-DD'),

        });
        this.idd=interviewData.jobApplication.idJobApp
      },
      (error) => {
        console.error('Error fetching interview data:', error);
      }
    );


    // Initialiser le formulaire avec les données récupérées et les contrôles de saisie
    this.interviewForm = this.formBuilder.group({
      applicantEmail: ['', [Validators.required, Validators.email]],
      interviewDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      dateInterview: [null, Validators.required]
    });
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.interviewForm.valid) {
      const interviewData = this.interviewForm.value;

      // Appeler le service pour mettre à jour l'interview
      this.interviewService.updateInterview(this.interviewId, interviewData).subscribe(
        () => {
          console.log('Interview updated successfully.');

          // Réinitialiser le formulaire après la mise à jour
          this.interviewForm.reset();
          this.router.navigate(['/back/interview/',this.idd]);

          Swal.fire({ // Afficher une alerte SweetAlert en cas de succès
            title: "Success!",
            text: "Interview  updated successfully!",
            icon: "success"
          });
        },
        error => {
          console.error('Error updating interview:', error);
        }
      );
    }
  }



}
