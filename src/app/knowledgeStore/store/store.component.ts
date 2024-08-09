import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileResponse } from 'src/app/_models/FileResponse';
import { saveAs } from 'file-saver';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  pageSize: number = 4; // Nombre d'éléments par page
  pageSizeOptions: number[] = [4, 8, 12]; // Options de nombre d'éléments par page
  imagePage: number = 0; // Page actuelle pour les images
  otherPage: number = 0; // Page actuelle pour les autres fichiers
  imageFiles: FileResponse[] = [];
  otherFiles: FileResponse[] = [];
  selectedFile: File | null = null;
  file: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadFiles();
  }

  isImage(fileName: string): boolean {
    return fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.avif') || fileName.endsWith('.svg');
  }

  loadFiles() {
    this.http.get<FileResponse[]>('http://localhost:8081/Pi/knowledge/files').subscribe(
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

      this.http.post('http://localhost:8081/Pi/knowledge/add', formData).subscribe(
        (response) => {
          console.log('Fichier ajouté avec succès : ', response);
          this.loadFiles(); // Mettre à jour la liste des fichiers après l'ajout
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du fichier : ', error);
        }
      );
    } else {
      console.error('Aucun fichier sélectionné.');
    }
  }

  openFile(filename: string) {
    const headers = new HttpHeaders().set('Accept', 'application/pdf'); // Adjust content type as needed
    this.http.get(`http://localhost:8081/Pi/knowledge/${filename}`, { headers, responseType: 'blob' })
      .subscribe(
        (blob) => {
          const file = new Blob([blob], { type: 'application/pdf' }); // Adjust content type as needed
          saveAs(file, filename);
        },
        (error) => {
          console.error('Erreur lors de l\'ouverture du fichier : ', error);
        }
      );
  }
  changeImagePage(event: PageEvent) {
    this.imagePage = event.pageIndex;
  }

  
  changeOtherPage(event: PageEvent) {
    this.otherPage = event.pageIndex;
  }
}
