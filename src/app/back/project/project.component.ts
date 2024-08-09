import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProjectService } from "../../_services/project.service";
import { Project } from "../../_models/project";
import Swal from "sweetalert2";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {jsPDF} from "jspdf";
import {AuthenticationService} from "../../_services/authentication/authentication.service";


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  id:  number= this.authService.logDecodedTokenId();
  projects: Project[] = [];
  projectForm!: FormGroup;
  searchTerm: string = '';
  noProjectsFound: boolean = false;
  allProject:Project[]=[];
  paginatedProjects: Project[] = [];
  currentPage: number = 1;
  pageSize: number = 3;


  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private cdr: ChangeDetectorRef,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id']; // Si vous avez besoin de récupérer l'id à partir de l'URL
    this.loadProjects();
    this.initProjectForm();
  }

  loadProjects(): void {
    this.projectService.getAllProjectsByUserId(this.id).subscribe(
      (data: Project[]) => {
        this.projects = data;
        this.paginateProjects();
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
  paginateProjects(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProjects = this.projects.slice(startIndex, endIndex);
    this.cdr.detectChanges();
  }
  onSetPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.paginateProjects();
  }

  initProjectForm(): void {
    this.projectForm = this.formBuilder.group({
      projectName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      startDate:['',[Validators.required]],
      endDate:['',[Validators.required]],
      projectDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    }, { validator: this.dateLessThan('startDate', 'endDate') });

  }
  dateLessThan(startFieldName: string, endFieldName: string) {
    return (formGroup: FormGroup): {[key: string]: any} | null => {
      const start = formGroup.controls[startFieldName];
      const end = formGroup.controls[endFieldName];
      if (start && end && start.value && end.value) {
        if (start.value > end.value) {
          return { 'datesInvalid': true };
        }
      }
      return null;
    };
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  addProject(): void {
    // Vérifie si le formulaire est valide
    if (this.projectForm.valid) {
      // Récupère les données du formulaire
      const formData = this.projectForm.value;

      // Utilise le service pour ajouter le projet
      this.projectService.addProject(formData, this.id).subscribe(
        (data) => {
          console.log('Project added successfully:', data);
          // Affiche une alerte SweetAlert en cas de succès
          Swal.fire({
            title: "Success!",
            text: "Project added successfully!",
            icon: "success"
          }).then(() => {
            // Recharge la page ou actualise les données si nécessaire
            this.ngOnInit();
            this.projectForm.reset();
            window.location.reload();
          });
        },
        (error) => {
          // Affiche une alerte SweetAlert en cas d'erreur
          Swal.fire({
            title: "Error!",
            text: "Failed to add Project. Please try again later.",
            icon: "error"
          });
          console.error('Error adding project:', error);
        }
      );
    } else {
      // Affiche une alerte SweetAlert si le formulaire est invalide
      Swal.fire({
        title: "Error!",
        text: "Please fill all required fields correctly.",
        icon: "error"
      });
    }
  }



  get f() {
    return this.projectForm.controls;
  }

  deleteProject(id: number): void {
    Swal.fire({
      title: "Are you sure you want to delete this project?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.deleteProject(id).subscribe(
          (data) => {
            console.log("Project deletion successful");
            this.loadProjects(); // Recharger les projets après la suppression
            Swal.fire(
              "Deleted!",
              "The project has been deleted.",
              "success"
            );
          },
          (error) => {
            console.error("Error deleting project:", error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the project.",
              "error"
            );
          }
        );
      }
    });
  }
  showForm: boolean = false;

  toggleForm() {
    this.showForm = !this.showForm;
  }
  searchProjects() {
    if (this.searchTerm.trim() !== '') {
      if (this.allProject.length === 0) {
        // Si les offres d'emploi n'ont pas encore été chargées, les charger
        this.projectService.getAllProjectsByUserId(this.id)
          .subscribe(
            (data: Project[]) => {
              this.allProject = data;
              this.filterPojrects();
            },
            error => {
              console.log('An error occurred:', error);
            }
          );
      } else {
        this.filterPojrects();

      }
    } else {
      this.loadProjects();
      this.noProjectsFound =false;

    }
  }

  filterPojrects() {
    this.paginatedProjects = this.allProject.filter(project =>
      project.projectName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Mettre à jour la variable noJobOffersFound en fonction du nombre d'offres trouvées
    this.noProjectsFound = this.paginatedProjects.length === 0;

  }

  protected readonly Math = Math;

  generatePDF(): void {

    const ProjectData = this.projects.map(j => ({
      'Name': j.projectName,
      'Description': j.projectDescription,
      'Start ': new Date(j.startDate).toLocaleDateString(),
      'End ': new Date(j.endDate).toLocaleDateString(),
    }));

    // Créez un nouveau document PDF
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Ajoutez un titre en haut de la première page
    const title = 'Projects';
    pdf.setFontSize(16);
    pdf.text(title, 105, 15, { align: 'center' });

    // Ajoutez un saut de ligne après le titre
    pdf.text(title, 105, 15, { align: 'center' });

    // Ajoutez le tableau de données
    pdf.table(50, 25, ProjectData, ['Name', 'Description', 'Start ', 'End '],
      { autoSize: true });

    // Générer le PDF en tant que Blob
    const pdfBlob = pdf.output('blob');

    // Créer une URL blob à partir des données du PDF
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Ouvrir le PDF dans un nouvel onglet
    window.open(pdfUrl, '_blank');




  }

}
