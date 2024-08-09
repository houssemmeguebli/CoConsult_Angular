import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Training } from 'src/app/_models/Training';
import { TrainingService } from 'src/app/_services/training.service';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})
export class AddTrainingComponent {
  selectedImage: File | null = null;
  selectedCV: File | null = null;
  training: Training = new Training();
  aFormGroup!: FormGroup;
  formSubmitted: boolean = false;


  constructor(
    private trainingService: TrainingService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onCVSelected(event: any) {
    this.selectedCV = event.target.files[0];
  }

  add(f: NgForm) {
    if (f.invalid) {
      // If the form is invalid, don't proceed with submission
      this.formSubmitted = true; // Set formSubmitted to true
      return;
    }
    this.trainingService.addTraining(this.training).subscribe({
      next: (addedTraining: Training) => {
        const trainingId = addedTraining.idTrainings;
        if (this.selectedImage) {
          this.uploadImage(trainingId);
        }

        this.router.navigate(['/back/getAllTrainings']);
      },
      error: (err: any) => console.error(err)
    });
  }


  uploadImage(trainingId: number) {
    if (this.selectedImage) {
      this.trainingService.uploadImage(trainingId, this.selectedImage).subscribe(
        (response: any) => {
          console.log('Image added successfully: ', response);
        },
        (error) => {
          console.error('Error adding image: ', error);
        }
      );
    }
  }

  siteKey: string = "6LeBnZUpAAAAAEDMtn5PQAEpTInPp0rB_fR60D-A";
}
