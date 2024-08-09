export class Feedback {
  id!: number;
  role!: Role;
  feedback!: FeedbackGiven;
  rating!: number;
  consultantName!: string;
  reportId!: number;
  date!: Date;
}

export enum Role {
  ProjectManager = 'Project Manager',
  Client = 'Client',
  TeamMember = 'Team Member'
}
export enum FeedbackGiven {
  Excellent = 'Excellent',
  VeryGood = 'Very Good',
  Good = 'Good',
  QuiteWell = 'Quite Well',
  Bad = 'Bad'
}
