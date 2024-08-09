import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent {
  constructor(private router: Router,private authService: AuthenticationService) { }

  // Vérifie si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }
  // Méthode pour déconnecter l'utilisateur
  signOut(): void {
    this.authService.logout();
    this.router.navigate(['/front']);
  }
}