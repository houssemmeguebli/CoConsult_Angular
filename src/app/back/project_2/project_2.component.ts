import { Component } from '@angular/core';
import { Router} from '@angular/router';
import {Consultant} from "../../_models/Consultant";
import {ConsultantService} from "../../_services/consultant.service";
import {Project_2} from "../../_models/project_2";
import {Project_2Service} from "../../_services/project_2.service";
@Component({
  selector: 'app-project_2',
  templateUrl: './project_2.component.html',
  styleUrls: ['./project_2.component.css']
})
export class Project_2Component {
  listConsult: Consultant[] = [];
  consultantNames: string[] = [];
  projects: Project_2[] = [];
  selectedConsultant: Consultant = new Consultant();
  constructor(private consultService: ConsultantService, private projectService: Project_2Service , private router :Router) {}

  ngOnInit(): void {
    this.fetchConsults();
   // this.fetchProjects();
    this.consultService.getConsultantsNames().subscribe(names => {
      this.consultantNames = names;
    });
  }

  fetchConsults() {
    this.consultService.getAllConsultants().subscribe({
      next: (data: Consultant[]) => this.listConsult = data,
      error: (error: any) => console.log(error),
      complete: () => console.log('done')
    });
  }

  /*
  fetchProjects() {
    this.projectService.getAllProjects().subscribe({
      next: (data: Project_2[]) => this.projects = data,
      error: (error: any) => console.log(error),
      complete: () => console.log('Projects fetched')
    });
  }

   */


  filterConsultants(project: Project_2): string[] {
    const filteredConsultants: string[] = [];
    const projectSkillsLowercase = project.projectRequirement.map(skill => skill.toLowerCase());

    this.listConsult.forEach(consultant => {
      const consultantSkillsLowercase = consultant.skills.map(skill => skill.toLowerCase());

      if (projectSkillsLowercase.every(skill => consultantSkillsLowercase.includes(skill))) {
        filteredConsultants.push(consultant.name);
      }
    });

    return filteredConsultants;
  }
  assignConsultant(projectId: number) {
    const project = this.projects.find(proj => proj.idProject === projectId);
    if (project && project.assignedConsultant) {
      const consultantName = project.assignedConsultant;
      const selectedConsultant = this.listConsult.find(consultant => consultant.name === consultantName);
      if (selectedConsultant) {
        const consultantId = selectedConsultant.id;
        this.projectService.assignConsultantToProject(projectId, consultantId).subscribe(
          updatedProject => {
            console.log('Consultant assigned successfully:', updatedProject);
          },
          error => {
            console.error('Error assigning consultant:', error);
          }
        );
      } else {
        console.error('Selected consultant not found.');
      }
    } else {
      console.error('No consultant selected.');
    }
  }


}



