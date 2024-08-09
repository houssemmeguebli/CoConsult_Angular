// liste-participants.component.ts
import { Component, OnInit } from '@angular/core';
import { ParticipantService } from 'src/app/_services/participant.service';

@Component({
  selector: 'app-liste-participants',
  templateUrl: './liste-participants.component.html',
  styleUrls: ['./liste-participants.component.css']
})
export class ListeParticipantsComponent implements OnInit {
  participants: string[] = [];

  constructor(private participantService: ParticipantService) { }

  ngOnInit(): void {
    this.participants = this.participantService.getParticipants();
  }
}
