export class Reclamation {
    reclamationID: number;
    subject: string;
    description: string;
    email: string;
    creationDate: string;
    status: ReclamationStatus;
  
    constructor(
        reclamationID: number = 0,
        subject: string = '',
        description: string = '',
        email: string = '',
        creationDate: string = '',
        status: ReclamationStatus = ReclamationStatus.PENDING
      ) {
        this.reclamationID = reclamationID;
        this.subject = subject;
        this.description = description;
        this.email = email;
        this.creationDate = creationDate;
        this.status = status;
      }
  }
  
  export enum ReclamationStatus {
    PENDING = 'PENDING',
    PROCESSED = 'PROCESSED',
    REJECTED = 'REJECTED'
  }
  