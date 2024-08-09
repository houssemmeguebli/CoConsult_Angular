import { User } from "./userCopy";

export interface EmpContract {
    idContEmp: number;
    type: Type;
    startDate: Date;
    endDate: Date;
    nameEmp: NameEmp;
    // other properties...
  }
  export enum Type{
    CDD,
    Partiel,
    Intermittent,
    Saisonnier,
    CDI,
    Temporaire,
    CUI,
    CIVP
  }
  export enum NameEmp{
    Sarra,
    Syrine,
    Houssem,
    Hassan,
    Ala
  }
  
  
  

