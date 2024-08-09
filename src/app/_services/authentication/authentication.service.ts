import { Injectable } from '@angular/core';
import {  OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterRequest} from "src/app/_models/register-request";
import {AuthenticationResponse} from "src/app/_models/authentication-response";
import {VerificationRequest} from "src/app/_models/verification-request";
import {AuthenticationRequest} from "src/app/_models/authentication-request";
import { User } from 'src/app/_models/user';
import { Observable } from 'rxjs';
import {an} from "@fullcalendar/core/internal-common";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService   {

  private baseUrl = 'http://localhost:8081/api/auth'

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  register(user: any): Observable<any> {
    console.log("Sending registration data: ", user); // Debug log
    return this.http.post<any>(`${this.baseUrl}/signup`, user, this.httpOptions);
  }

  login(
    authRequest: AuthenticationRequest
  ) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/signin`, authRequest);
  }

  verifyCode(verificationRequest: VerificationRequest) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/verify`, verificationRequest);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
  // Méthode pour vérifier si l'utilisateur a un rôle spécifique
  /*hasRole(role: string): boolean {
    const token = this.getToken();
    if (!token) {
      return false; // L'utilisateur n'est pas connecté
    }

    // Parse du token JWT pour obtenir les informations sur l'utilisateur
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    // Récupération des rôles de l'utilisateur à partir du token décrypté
    const userRoles = decodedToken.roles;

    // Vérification si le rôle spécifié est présent dans les rôles de l'utilisateur
    return userRoles.includes(role);

  }
*/
  getRole(): string | null {
    const token = this.getToken();
    if (!token) {
      return null; // L'utilisateur n'est pas connecté
    }

    // Parse du token JWT pour obtenir les informations sur l'utilisateur
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    // Récupération du rôle de l'utilisateur à partir du token décrypté
    const userRole = decodedToken.role;

    return userRole;
  }

  // Méthode pour afficher le token JWT décodé dans la console
  logDecodedToken(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      const roles = decodedToken.roles.map((role: any) => role.name);
      const rolesString = roles.join(', '); // Concatène les rôles en une seule chaîne séparée par une virgule et un espace
      console.log('User Roles:', rolesString);
      return rolesString; // Retourne la chaîne de rôles
    } else {
      console.error('Token not found.');
      return ''; // Retourne une chaîne vide si le token n'est pas trouvé
    }
  }
  logDecodedTokenId(): any {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      const id = decodedToken.id;
      console.log('User ID:', id);
      return id; // Retourne l'ID de l'utilisateur
    } else {
      console.error('Token not found.');
      return ''; // Retourne une chaîne vide si le token n'est pas trouvé
    }
  }
  logDecodedTokenName(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      const name = decodedToken.username; // Assurez-vous de remplacer 'username' par la propriété correcte
      console.log('User name:', name);
      return name; // Retourne le nom de l'utilisateur
    } else {
      console.error('Token not found.');
      return ''; // Retourne une chaîne vide si le token n'est pas trouvé
    }
  }
  logDecodedTokenmail(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      const email = decodedToken.email; // Utiliser la propriété 'email' pour récupérer l'email de l'utilisateur
      console.log('User email:', email);
      return email; // Retourner l'email de l'utilisateur
    } else {
      console.error('Token not found.');
      return ''; // Retourner une chaîne vide si le token n'est pas trouvé
    }
  }
  
  


  private decodeToken(token: string): any {
    // Décodage du token JWT
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  }
}
