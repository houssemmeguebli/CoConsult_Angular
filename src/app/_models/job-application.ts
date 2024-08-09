import {JobOffer} from "./job-offer";
import {Interview} from "./interview";

export interface JobApplication {

  idJobApp: number;
  nameApplicant: string
  emailApplicant: string
  phoneApplicant: string
  dateApplication: Date
  resumePath: string
  jobOffer: JobOffer;
  interviews:Interview[]
}
