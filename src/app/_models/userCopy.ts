import { Department } from "./department";
import { EmpContract } from "./emp-contract";
import { Leave } from "./leave";
import { Performance } from "./performance";


export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    department: string;
    password: string;
    mfaEnabled: boolean;
    secret: string;
    role: Role;
    status: UserStatus;
    empContract?: EmpContract; // Assuming EmpContract is another model
    leave?: Leave[]; // Assuming Leave is another model
    performance?: Performance; // Assuming Performance is another model
    departments: Department; // Assuming Department is another model
  }
  
  export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    CUSTOMER = 'CUSTOMER',
    EMPLOYEE = 'EMPLOYEE',
    HR = 'HR',
    CONSULTANT = 'CONSULTANT',
  }
  
  export enum UserStatus {
    ACTIVE = 'ACTIVE',
    OFFLINE = 'OFFLINE',
    INVISIBLE = 'INVISIBLE',
  }
  
  
  // Define EmpContract, Leave, Performance, and Department models accordingly
  