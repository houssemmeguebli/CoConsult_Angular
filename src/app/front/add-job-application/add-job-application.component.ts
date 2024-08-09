
// add-job-application.component.ts

import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {JobApplicationService} from "../../_services/job-application.service";
import Swal from 'sweetalert2';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-job-application',
  templateUrl: './add-job-application.component.html',
  styleUrls: ['./add-job-application.component.css']
})
export class AddJobApplicationComponent {
  jobApplicationForm: FormGroup;
  selectedFile: File | null = null;
  idJobOffer!: number ;

  constructor(private jobApplicationService: JobApplicationService,private route:ActivatedRoute) {
    this.jobApplicationForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(8),Validators.maxLength(15)]),
      resume: new FormControl(null, [Validators.required])

    });
  }

  /*

  validatePDF(control: FormControl) {
    const file = control.value;
    if (file && file.name) {
      const extension = file.name.split('.').pop().toLowerCase();
      if (extension !== 'pdf') {
        return {
          invalidExtension: true
        };
      }
    }
    return null;
  }

   */

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  ngOnInit(){
    this.idJobOffer = this.route.snapshot.params['id'];

  }
  addJobApplication() {
    const { name, email, phone } = this.jobApplicationForm.value;
    if (!name || !email || !phone || !this.selectedFile) {
      console.error('Please fill in all fields and select a file.');
      Swal.fire({
        title: "Error!",
        text: "Please fill in all fields and select a PDF file.",
        icon: "error"
      });
      return;
    }
    this.jobApplicationService.addJobApplication(this.selectedFile, name, email, phone, this.idJobOffer)
      .subscribe(
        (response) => {
          console.log('File uploaded successfully!', response);
          this.jobApplicationForm.reset();
          this.selectedFile = null;
          Swal.fire({
            title: "Success!",
            text: "Your job application has been added successfully!",
            icon: "success"
          });
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
  }
}
