import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Meeting } from 'src/app/_models/Meeting';
import { MeetingService } from 'src/app/_services/meeting.service';
@Component({
  selector: 'app-update-meetings',
  templateUrl: './update-meetings.component.html',
  styleUrls: ['./update-meetings.component.css']
})
export class UpdateMeetingsComponent {
  aFormGroup!: FormGroup;
  meet: Meeting = new Meeting();
  id: number;

  constructor(
    private meetService: MeetingService,
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
      this.meetService.updateMeeting( this.id,this.meet).subscribe({
        next: () => {
          console.log("Task updated successfully!");
          this.router.navigate(['/getallMeetings']);
        },
        error: (err) => console.log(err)
      });
    }
  }
  siteKey : string="6LeBnZUpAAAAAEDMtn5PQAEpTInPp0rB_fR60D-A";

}
