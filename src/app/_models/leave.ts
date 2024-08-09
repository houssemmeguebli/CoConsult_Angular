import { User } from "./userCopy";

export interface Leave {
    idLeave: number;
    typeLeave: TypeLeave; 
    startDateLeave: string; 
    endDateLeave: string; 
    etat: EtatLeave;
    user: User; 
}
    export enum TypeLeave {
        Vacation = 'Vacation',
        Sickness = 'Sickness',
        Paternity = 'Paternity',
        Annual = 'Annual',
        Religious = 'Religious',
        Marriage = 'Marriage',
        Other = 'Other',
      }
      export enum EtatLeave {
        UNSEEN = 'UNSEEN',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED'
      }
  
  