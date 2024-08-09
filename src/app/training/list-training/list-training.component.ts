import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/_models/Training';
import { TrainingService } from 'src/app/_services/training.service';
import { FileResponse } from 'src/app/_models/FileResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as saveAs from 'file-saver';
import { ConsultantService } from 'src/app/_services/consultant.service';
import { Consultant } from 'src/app/_models/Consultant';
import { ParticipantService } from 'src/app/_services/participant.service';

@Component({
  selector: 'app-list-training',
  templateUrl: './list-training.component.html',
  styleUrls: ['./list-training.component.css']
})
export class ListTrainingComponent {
  listTrain: Training[] = [];
  train!:string;
  imageFiles: FileResponse[] = [];
  otherFiles: FileResponse[] = [];
  selectedFile: File | null = null;
  images!: string[];
  newConsultantName!: string;
  trainingId!: number;
  selectedConsultants: string[] = [];
  listConsultants: string[] = [];
  showConsultantSelectionPanel = false;
  consultantsAddedToTraining: string[] = [];

  constructor(private trainingService: TrainingService, private consultantService: ConsultantService,private datePipe: DatePipe, private router: Router,private http: HttpClient,private participantService: ParticipantService) { }

  ngOnInit(): void {
    this.loadFiles();
    this.fetchTrainings();
    this.consultantService.getAllConsultants().subscribe({
      next: (data: Consultant[]) => {
        // Initialisation de listConsultants avec les noms des consultants
        this.listConsultants = data.map(consultant => consultant.name);
      },
      error: (error) => console.log(error)
    });
  }

  fetchTrainings() {
    this.trainingService.getAllTrainings().subscribe({
      next: (data) => this.listTrain = data,
      error: (error) => console.log(error),
      complete: () => console.log('done')
    });
  }

  isImage(fileName: string): boolean {
    return !!fileName && (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.avif') || fileName.endsWith('.svg'));
  }

  loadFiles() {
    this.http.get<FileResponse[]>('http://localhost:8081/Pi/training/getAllTrainings').subscribe(
      (response) => {
        this.imageFiles = response.filter(file => this.isImage(file.fileName));
        this.otherFiles = response.filter(file => !this.isImage(file.fileName));
      },
      (error) => {
        console.error('Erreur lors du chargement des fichiers : ', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post('http://localhost:8081/Pi/training/{trainingId}/file', formData).subscribe(
        (response: any) => {
          console.log('File added successfully: ', response);
          this.selectedFile = null;
          this.loadFiles();
        },
        (error) => {
          console.error('Error adding file: ', error);
        }
      );
    } else {
      console.error('No file selected.');
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post('http://localhost:8081/Pi/training/{trainingId}/image', formData).subscribe(
        (response: any) => {
          console.log('image added successfully: ', response);
          this.selectedFile = null;
          this.loadFiles();
        },
        (error) => {
          console.error('Error adding file: ', error);
        }
      );
    } else {
      console.error('No file selected.');
    }
  }

  openImage(filename: string) {
    const headers = new HttpHeaders().set('Accept', 'application/avif'); // Adjust content type as needed
    this.http.get(`http://localhost:8081/Pi/training/{trainingId}/image`, { headers, responseType: 'blob' })
      .subscribe(
        (blob) => {
          const file = new Blob([blob], { type: 'application/avif' }); // Adjust content type as needed
          saveAs(file, filename);
        },
        (error) => {
          console.error('Erreur lors de l\'ouverture du fichier : ', error);
        }
      );
  }

  navigateToUpdateTrain(trainId: number): void {
    this.router.navigate(['/back/updateTraining', trainId]);
  }

  deleteTrain(trainId: number): void {
    this.trainingService.deleteTraining(trainId).subscribe({
      next: () => {
        console.log('Task deleted successfully!');
        this.fetchTrainings();
      },
      error: (err: any) => {
        console.error('Error deleting task:', err);
      }
    });
  }

  viewTrainDetails(trainId: number): void{
    console.log('Meet ID:', trainId);
    this.router.navigate(['/back/getTrainingById', trainId]);
  }

  sortByNearestDate() {
    this.listTrain.sort((a, b) => {
      return new Date(a.trainingsDate).getTime() - new Date(b.trainingsDate).getTime();
    });
  }

  sortByFurthestDate() {
    this.listTrain.sort((a, b) => {
      return new Date(b.trainingsDate).getTime() - new Date(a.trainingsDate).getTime();
    });
  }

  registerForTraining (trainId: number): void {
    this.router.navigate(['/back/mailingPage', trainId]);
  }

  openConsultantSelectionPanel(): void {
    this.consultantService.getAllConsultants().subscribe({
      next: (data) => {
        this.listConsultants = data.map(consultant => consultant.name);
        this.showConsultantSelectionPanel = true;
      },
      error: (error) => console.error(error),
      complete: () => console.log('done')
    });
  }

  addConsultantToTraining(trainingId: number): void {
    if (this.selectedConsultants.length === 0) {
      console.error('Veuillez sélectionner le ou les noms de consultants à ajouter !');
      return;
    }

    this.trainingService.addConsultantsToTraining(trainingId, this.selectedConsultants)
      .subscribe(
        response => {
          console.log('Consultants ajoutés avec succès :', response);
          this.selectedConsultants = [];
        },
        error => {
          console.error('Une erreur s\'est produite lors de l\'ajout des consultants :', error);
        }
      );
  }

  toggleConsultantSelection(consultantName: string): void {
    const index = this.selectedConsultants.indexOf(consultantName);
    if (index !== -1) {
      // Si le nom du consultant est déjà dans la liste, retirez-le
      this.selectedConsultants.splice(index, 1);
    } else {
      // Sinon, ajoutez-le à la liste
      this.selectedConsultants.push(consultantName);
    }
  }

  getConsultantsAddedToTraining(trainingId: number) {
    this.trainingService.addConsultantsToTraining(trainingId, this.selectedConsultants)
.subscribe(
        (consultants: string[]) => {
            this.consultantsAddedToTraining = consultants;
        },
        (error: any) => {
            console.error('Une erreur s\'est produite lors de la récupération de la liste des consultants ajoutés à la formation :', error);
        }
    );
  }
  viewParticipants(trainingId: number): void {
    this.trainingService.getConsultantsAddedToTraining(trainingId).subscribe(
      (participants: string[]) => {
        // Stockez les participants dans le service ParticipantService
        this.participantService.setParticipants(participants);
        // Rediriger vers le composant ListeParticipantsComponent
        this.router.navigate(['/back/liste-participants']);
      },
      (error: any) => {
        console.error('Error fetching participants:', error);
        // Gérer l'erreur, par exemple afficher un message d'erreur à l'utilisateur
        alert('Error fetching participants. Please try again later.');
      }
    );
  }
}

