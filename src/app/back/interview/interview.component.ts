import { Component } from '@angular/core';
import {InterviewService} from "../../_services/interview.service";
import {Interview} from "../../_models/interview";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {EmailRequest} from "../../_models/email-request";
import {formatDate} from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent {
  interview!: Interview ;
  idJob!: number;
  name!:string;
  constructor(private interviewService: InterviewService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idJob = this.route.snapshot.params['id'];
    this.getInterviewByJob(this.idJob);
  }

  getInterviewByJob(id: number): void {
    this.interviewService.getInerViewsByJobApp(id).subscribe(
      (data) => {
        this.interview = data;
        this.name = this.interview.jobApplication.nameApplicant;

      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteInterview(id: number): void {
    Swal.fire({
      title: "Are you sure you want to delete this interview?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        this.interviewService.deleteInterview(id).subscribe(
          (data) => {
            console.log("Suppression de l'entrevue effectuée avec succès");
            this.ngOnInit(); // Réinitialiser les données après la suppression
            Swal.fire(
              "Deleted!",
              "The interview has been deleted.",
              "success"
            );
          },
          (error) => {
            console.error("Erreur lors de la suppression de l'entrevue:", error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the interview.",
              "error"
            );
          }
        );
      }
    });
  }

  sendEmail(interview: Interview): void {
    const formattedDate = formatDate(interview.dateInterview, 'dd-MM-yyyy', 'en-US');

    const emailContent = `
   <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
  <h2 style="font-size: 20px; font-weight: bold; color: #333; margin-bottom: 10px;">Invitation to Interview: Confirm Your Attendance</h2>
  <p style="font-size: 16px; color: #666;">A new interview has been added for your application.</p>
<p style="font-size: 16px; color: #666;">Interview Date: <span style="font-weight: bold; color: #007bff;">${ formattedDate }</span></p>
      <p style="font-size: 16px; color: #666;">Description: <span style="font-weight: bold; color: #007bff;">${interview.interviewDescription}</span></p>
  <p style="font-size: 16px; color: #666;">Congratulations on your pre-acceptance!</p>
  <p style="font-size: 16px; color: #666;">COCONSULT YOUR PARTNER IN PROGRESS </p>
</div>

  `;

    const emailRequest: EmailRequest = {
      to: interview.applicantEmail,
      subject: 'Invitation to Interview: Confirm Your Attendance',
      body: emailContent
    };

    this.interviewService.sendEmail(emailRequest).subscribe(
      (data) => {
        console.log('Email sent successfully to the candidate.', data);
       // alert("Email sent successfully to the candidate");
        Swal.fire({ // Afficher une alerte SweetAlert en cas de succès
          title: "Success!",
          text: "Email sent successfully to the candidate",
          icon: "success"
        });
      },
      error => {
        console.error('Error sending email to the candidate:', error);
       // alert("Email sent successfully to the candidate");
        Swal.fire({ // Afficher une alerte SweetAlert en cas de succès
          title: "Success!",
          text: "Email sent successfully to the candidate",
          icon: "success"
        });      }
    );
  }

}
