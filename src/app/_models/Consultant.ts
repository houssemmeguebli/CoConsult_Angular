import { ActivityManagement } from "./ActivityManagement";

export class Consultant {
  [x: string]: any;
  id!: number;
  name!: string;
  skills!: string[];
  availability!: Etat;
  tasksTotal?: number;
  tasksCompleted?: number;
  taskInProgress?: ActivityManagement;
  tasksByWeek!: { [key: string]: { assigned: number, completed: number } };
  tasks!: Task[];

}

export interface Task {
  id: number;
  name: string;
  completed: boolean;
  creationDate: Date;
}
export enum Etat {
  available = 'available',
  notAvailable = 'notAvailable'
}
