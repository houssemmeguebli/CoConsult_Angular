import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivityManagementService } from '../_services/activity-management.service';
import { ConsultantService } from '../_services/consultant.service';
import { Consultant } from '../_models/Consultant';

@Component({
  selector: 'app-add-consultant',
  templateUrl: './add-consultant.component.html',
  styleUrls: ['./add-consultant.component.css']
})
export class AddConsultantComponent {

  aFormGroup!: FormGroup;
  consult: Consultant = new Consultant();
  selectedSkills: { [key: string]: boolean } = {};
  formSubmitted: boolean = false;

  availableSkills: string[] = ['Java', 'JavaScript', 'Python', 'Angular', 'React', 'Spring Boot', "c++", "c#", ".Net"];
  constructor(
    private consultService: ConsultantService,
    private router: Router,
    private formBuilder: FormBuilder,

  ) { }
  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }
  atLeastOneSkillSelected(): boolean {
    return Object.values(this.selectedSkills).some(skill => skill === true);
  }

  add(f: NgForm) {
    if (f.invalid || !this.atLeastOneSkillSelected()) {
      this.formSubmitted = true; 
      return;
    }
    this.consult.skills = Object.keys(this.selectedSkills).filter(key => this.selectedSkills[key]);
    this.consultService.addConsultant(this.consult).subscribe({
      next: () => {
        console.log("Consultant added successfully!");
        this.router.navigate(['/getAllConsultants']);
      },
      error: (err: any) => console.log(err)
    });
  }

  siteKey: string = "6LeBnZUpAAAAAEDMtn5PQAEpTInPp0rB_fR60D-A";

}
