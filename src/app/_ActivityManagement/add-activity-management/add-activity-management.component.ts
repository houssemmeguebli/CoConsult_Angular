import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityManagement } from 'src/app/_models/ActivityManagement';
import { ActivityManagementService } from 'src/app/_services/activity-management.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-activity-management',
  templateUrl: './add-activity-management.component.html',
  styleUrls: ['./add-activity-management.component.css']
})
export class AddActivityManagementComponent {
  aFormGroup!: FormGroup;
  task: ActivityManagement = new ActivityManagement();
  formSubmitted: boolean = false;


  constructor(
    private activityManagementService: ActivityManagementService,
    private router: Router,
    private formBuilder: FormBuilder,

  ) {}
  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }
  add(f: NgForm) {
    if (f.invalid) {
      // If the form is invalid, don't proceed with submission
      this.formSubmitted = true; // Set formSubmitted to true
      return;
    }
    console.log(this.task);
    this.activityManagementService.addActivityMangement(this.task).subscribe({
      next: () => {
        console.log("Task added successfully!");
        this.router.navigate(['/getAll']);
      },
      error: (err: any) => console.log(err)
    });
  }
  siteKey : string="6LeBnZUpAAAAAEDMtn5PQAEpTInPp0rB_fR60D-A";

}
