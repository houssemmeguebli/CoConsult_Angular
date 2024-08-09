// participant.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  participants: string[] = [];

  constructor() { }

  setParticipants(participants: string[]): void {
    this.participants = participants;
  }

  getParticipants(): string[] {
    return this.participants;
  }
}
