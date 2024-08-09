import {JobApplication} from "./job-application";
import {User} from "./userCopy";

export interface JobOffer {

  idJobOffer: number;
  jobName: string;
  jobDescription:string;
  jobExpirationDate:Date;
  positionNumber:number;
  jobApplications:JobApplication[]
  user:User

}
