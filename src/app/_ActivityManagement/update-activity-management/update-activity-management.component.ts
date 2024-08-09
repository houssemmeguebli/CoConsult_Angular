import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityManagement } from 'src/app/_models/ActivityManagement';
import { ActivityManagementService } from 'src/app/_services/activity-management.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-activity-management',
  templateUrl: './update-activity-management.component.html',
  styleUrls: ['./update-activity-management.component.css']
})
export class UpdateActivityManagementComponent {
  aFormGroup!: FormGroup;
  task: ActivityManagement = new ActivityManagement();
  id: number;

  constructor(
    private activityManagementService: ActivityManagementService,
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
  }
  update(form: NgForm) {
    if (form.valid) {
      this.activityManagementService.updateActivityManagement(this.task, this.id).subscribe({
        next: () => {
          console.log("Task updated successfully!");
          this.router.navigate(['/getAll']);
        },
        error: (err) => console.log(err)
      });
    }
  }
  siteKey : string="6LeBnZUpAAAAAEDMtn5PQAEpTInPp0rB_fR60D-A";

}
