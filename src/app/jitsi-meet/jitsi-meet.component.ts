import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-jitsi-meet',
  templateUrl: './jitsi-meet.component.html',
  styleUrls: ['./jitsi-meet.component.css']
})
export class JitsiMeetComponent implements OnInit, AfterViewInit {
  domain: string = "meet.jit.si";
  room!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.room = 'HR Interview'; 
  }

  ngAfterViewInit(): void {
    const options = {
      roomName: this.room,
      parentNode: document.querySelector('#jitsi-iframe')
    };

    const api = new JitsiMeetExternalAPI(this.domain, options);
  }
}
