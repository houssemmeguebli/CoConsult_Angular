import {User} from "./userCopy";
import {Invoices} from "./invoices";

export class Contrats {
  idContrat!: number;
  startDate!: Date;
  endDate!: Date;
  description!: string;
  projectName!: string;
  email!: string;
  etat!: string;
  invoices!: Invoices;
  user!: User;
}
