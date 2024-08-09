export class User {
    id!: number;
    username!: string;
    email!: string;
    password !: string;
    role!: []; // ou vous pouvez utiliser une énumération si nécessaire
    gender!: string;
    departmentName!: string;
    dateOfBirth!: Date
    mfaEnabled!: boolean;

    constructor(){}


    
  }
  