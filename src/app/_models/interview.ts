import {JobApplication} from "./job-application";

export interface Interview {

  idInterview:number ;
  applicantEmail:string;
  interviewDescription:string;
  dateInterview:Date;
  jobApplication:JobApplication;


}

