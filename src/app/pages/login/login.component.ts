import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/_models/authentication-request';
import { AuthenticationResponse } from 'src/app/_models/authentication-response';
import { VerificationRequest } from 'src/app/_models/verification-request';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authRequest: AuthenticationRequest = {};
  otpCode = '';
  authResponse: AuthenticationResponse = {};

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  authenticate() {
    this.authService.login(this.authRequest)
      .subscribe({
        next: (response) => {
          this.authResponse = response;
          if (!this.authResponse.mfaEnabled) {
            localStorage.setItem('token', response.accessToken as string);
            this.router.navigate(['users']);
            
            // Vérifier si roles est défini avant de l'utiliser
            if (response.roles) {
              const roles = response.roles;
              if (roles.includes('ROLE_ADMIN') || roles.includes('HR') || roles.includes('CRM_manager')|| 
              roles.includes('Consultant')  || roles.includes('EMPLOYEE')
              || roles.includes('CRM_team') || roles.includes('Project_manager')
            
            ) {
                this.router.navigate(['back']);
              } else if (roles.includes('ROLE_USER')) {
                this.router.navigate(['/front']);
              } else {
                // Redirection par défaut si aucun rôle spécifique n'est défini
                this.router.navigate(['/front']);
              }
            } else {
              // Gérer le cas où roles est indéfini
              console.error('Roles are not defined in the response');
              // Rediriger vers une page par défaut ou afficher un message d'erreur
              this.router.navigate(['/front']);
            }
  
            // Afficher une alerte de succès
            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              text: 'You have successfully logged in!',
              showConfirmButton: false,
              timer: 1500
            });
          }
        },
        error: (err) => {
          console.error('Login error', err);
          // Afficher une alerte d'erreur
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid login credentials. Please try again!',
            footer: '<a href="/forgot-password">Forgot your password?</a>'
          });
        }
      });
  }
  

  verifyCode() {
    const verifyRequest: VerificationRequest = {
      email: this.authRequest.username,
      code: this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.accessToken as string);
          this.router.navigate(['welcome']);
        }
      });
  }
}



