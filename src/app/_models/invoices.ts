import {Contrats} from "./contrats";

export class Invoices {
  idInvoices!: number;
  idContrat!: number;
  dateInvoice!: Date;
  amount!: number;
  nameDestinaire!: string;
  emailDestinaire!: string;
  etat!: boolean;
  contrat!: Contrats;
}
