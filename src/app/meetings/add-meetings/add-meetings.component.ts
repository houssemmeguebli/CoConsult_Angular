import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meeting } from 'src/app/_models/Meeting';
import { MeetingService } from 'src/app/_services/meeting.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-meetings',
  templateUrl: './add-meetings.component.html',
  styleUrls: ['./add-meetings.component.css']
})
export class AddMeetingsComponent {
  aFormGroup!: FormGroup;

  meet = new Meeting();
  todayDate: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private meetingService: MeetingService,
    private router: Router,
    private datePipe: DatePipe // Inject DatePipe
  ) {
    const today = new Date();
const year = today.getFullYear();
const month = ('0' + (today.getMonth() + 1)).slice(-2);
const day = ('0' + today.getDate()).slice(-2);
this.todayDate = year + '-' + month + '-' + day;

    if (data && data.date) {
      this.meet.meetingsDate = data.date;
    } else {
      this.meet.meetingsDate = new Date();
    }
  }

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  add(f: NgForm) {
    console.log(this.meet);
    this.meetingService.addMeeting(this.meet).subscribe({
      next: () => {
        console.log('Meet added successfully!');
        this.router.navigate(['/getallMeetings']);
      },
      error: (err: any) => console.log(err)
    });
  }


  siteKey: string = '6LeBnZUpAAAAAEDMtn5PQAEpTInPp0rB_fR60D-A';
}

