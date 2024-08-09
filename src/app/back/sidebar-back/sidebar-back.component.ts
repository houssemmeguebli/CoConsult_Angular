import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';

@Component({
  selector: 'app-sidebar-back',
  templateUrl: './sidebar-back.component.html',
  styleUrls: ['./sidebar-back.component.css']
})
export class SidebarBackComponent implements OnInit {
  constructor(private authService: AuthenticationService) { }
  isAdmin = false;
  isCRMManager = false;
  isProjectManager = false;
  isHR = false;
  isConsultant = false;
  isEmployee = false;
  isCRM_team= false;

  ngOnInit(): void {
    
    const roles = this.authService.logDecodedToken();
    const id : number= this.authService.logDecodedTokenId();
    console.log('User Roles:', roles);

    switch (roles) {
      case 'ROLE_ADMIN':
        console.log('User is an admin.');
        this.isAdmin = true;
        break;
      case 'CRM_manager':
        console.log('User is a CRM manager.');
        this.isCRMManager = true;
        break;
      case 'Project_manager':
        console.log('User is a project manager.');
        this.isProjectManager = true;
        break;
      case 'HR':
        console.log('User is in HR.');
        this.isHR = true;
        break;
      case 'Consultant':
        console.log('User is a consultant.');
        this.isConsultant = true;
        break;
      case 'ROLE_USER':
        console.log('User is a ROLE_USER.');
        this.isConsultant = true;
        break;
      case 'EMPLOYEE':
        console.log('User is an employee.');
        this.isEmployee = true;
        break;
        case 'CRM_team':
        console.log('User is an CRM_team.');
        this.isCRM_team = true;
        break;
      default:
        console.log('Unknown role.');
        break;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
