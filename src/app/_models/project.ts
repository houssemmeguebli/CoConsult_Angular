import {User} from "./userCopy";

export interface Project {

  idProject:number
  projectName:string
  projectDescription:string
  startDate:Date
  endDate:Date
  user:User
}
