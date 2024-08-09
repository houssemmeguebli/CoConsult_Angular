
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Training } from 'src/app/_models/Training';
import { TrainingService } from 'src/app/_services/training.service';

@Component({
  selector: 'app-update-training',
  templateUrl: './update-training.component.html',
  styleUrls: ['./update-training.component.css']
})
export class UpdateTrainingComponent {
  aFormGroup!: FormGroup;
  selectedCV: File | null = null;
  train: Training = new Training();
  id: number;

  constructor(
    private trainingService: TrainingService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.id = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });

    // Charger les détails de la formation à modifier
    this.trainingService.getTrainingById(this.id).subscribe((training: Training) => {
      this.train = training;
    });
  }

  onCVSelected(event: any) {
    this.selectedCV = event.target.files[0];
  }

  update(form: NgForm) {
    if (form.valid) {
      this.trainingService.updateTraining(this.id, this.train).subscribe({
        next: () => {
          if (this.selectedCV) {
            this.uploadFile(this.id);
          }
          console.log("Formation mise à jour avec succès!");
          this.router.navigate(['/getAllTrainings']);
        },
        error: (err) => console.log(err)
      });
    }
  }

  uploadFile(trainingId: number) {
    if (this.selectedCV) {
      this.trainingService.uploadFile(trainingId, this.selectedCV).subscribe(
        (response: any) => {
          console.log('Fichier ajouté avec succès: ', response);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du fichier: ', error);
        }
      );
    }
  }

  siteKey: string = "6LeBnZUpAAAAAEDMtn5PQAEpTInPp0rB_fR60D-A";
}
