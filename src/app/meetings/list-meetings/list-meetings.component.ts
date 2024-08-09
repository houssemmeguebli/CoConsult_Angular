import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meeting } from 'src/app/_models/Meeting';
import { MeetingService } from 'src/app/_services/meeting.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // if you're using the dayGrid view
import { MatDialog } from '@angular/material/dialog';
import interactionPlugin from '@fullcalendar/interaction';
import { AddMeetingsComponent } from '../add-meetings/add-meetings.component';


@Component({
  selector: 'app-list-meetings',
  templateUrl: './list-meetings.component.html',
  styleUrls: ['./list-meetings.component.css']
})
export class ListMeetingsComponent implements OnInit {
  listMeet: Meeting[] = [];
  meetingsForCalendar: any[] = [];
  meet!:string;

  constructor(private dialog: MatDialog, private meetingService: MeetingService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.fetchMeets();
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin], // Ensure interactionPlugin is included
    dateClick: this.handleDayClick.bind(this),
   };

   handleDayClick(dateInfo: any) {
    const dialogRef = this.dialog.open(AddMeetingsComponent, {
      width: '800px', // Adjust dialog width as needed
      data: { date: dateInfo.dateStr } // Pass clicked date to dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }



  fetchMeets() {
    this.meetingService.getAllMeetings().subscribe({
      next: (data) => {
        this.listMeet = data;
        this.meetingsForCalendar = data.map(meeting => ({
          title: meeting.subjectMeetings,
          start: this.datePipe.transform(meeting.meetingsDate, 'yyyy-MM-dd'),
        }));
      },
      error: (error) => console.log(error),
      complete: () => console.log('done')
    });
  }

  navigateToUpdateMeet(meetId: number): void {
    this.router.navigate(['/updateMeeting', meetId]);
  }

  deleteMeet(meetId: number): void {
    this.meetingService.deleteMeeting(meetId).subscribe({
      next: () => {
        console.log('Task deleted successfully!');
        this.fetchMeets();
      },
      error: (err: any) => {
        console.error('Error deleting task:', err);
      }
    });
  }

  viewMeetDetails(meetId: number): void {
    console.log('Meet ID:', meetId);
    this.router.navigate(['/getMeetingById', meetId]);
  }
  sortByNearestDate() {
    this.listMeet.sort((a, b) => {
      return new Date(a.meetingsDate).getTime() - new Date(b.meetingsDate).getTime();
    });
  }

  sortByFurthestDate() {
    this.listMeet.sort((a, b) => {
      return new Date(b.meetingsDate).getTime() - new Date(a.meetingsDate).getTime();
    });
  }
}
