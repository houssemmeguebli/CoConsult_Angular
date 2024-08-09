import { Component } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Project} from "../../_models/project";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../_services/project.service";
//import * as moment from "moment/moment";
import * as moment from 'moment';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent {
  updateProjectForm!: FormGroup;
  projectId!: number;
  project!: Project;

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    this.updateProjectForm = this.formBuilder.group({
      projectName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      startDate:['',[Validators.required]],
      endDate:['',[Validators.required]],
      projectDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]

    });
    this.getProjectDetails();
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getProjectDetails(): void {
    this.projectService.getProjectById(this.projectId).subscribe(
      (data) => {
        this.project = data;
        this.updateProjectForm.patchValue({
          projectName: this.project.projectName,
          projectDescription:this.project.projectDescription,
          startDate: moment(this.project.startDate).format('YYYY-MM-DD'),
          endDate: moment(this.project.endDate).format('YYYY-MM-DD'),

        });
      },
      (error) => {
        console.error('Error fetching project details:', error);
      }
    );
  }

  updateProject(): void {
    if (this.updateProjectForm.invalid) {
      return;
    }

    const formData = this.updateProjectForm.value;
    this.projectService.updateProject(formData, this.projectId).subscribe(
      (data) => {
        console.log('Project updated successfully:', data);
        this.updateProjectForm.reset();
        Swal.fire({
          title: "Success!",
          text: "Project updated successfully!",
          icon: "success"
        });
        this.router.navigate(['/back/projects']);

      },
      (error) => {
        Swal.fire({
          title: "Error!",
          text: "Failed to update Project. Please try again later.",
          icon: "error"
        });
        console.error('Error updating project:', error);
      },


    );
  }

}
