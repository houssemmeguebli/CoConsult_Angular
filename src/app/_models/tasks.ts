import { User } from "./userCopy";

export class Tasks {
  idTasks!: number;
  descriptionTasks!: string;
  recipientTasks!: string;
  emailRecipient!: string; // New field
  status!: string;
  priority!: number;
  dateAjout!: Date; // New field
  users!: User[];
}
