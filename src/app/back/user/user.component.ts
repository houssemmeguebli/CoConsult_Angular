import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';
import { User } from 'src/app/_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  users: User[] = [];
  searchTerm: string = '';
  filteredUsers: User[] = [];

  constructor( private http: HttpClient) { }


  ngOnInit(): void {
    this.loadUsers();
    this.getAllUsers();

  }
  
  loadUsers(): void {
    this.getAllUsers();
  }
  
  getAllUsers(): void {
    // Obtenir le token d'authentification stocké localement
    const token = localStorage.getItem('token');
  
    // Créer un en-tête HTTP avec le token d'authentification
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Utiliser l'en-tête dans une requête HTTP
    this.http.get<User[]>('http://localhost:8081/api/v1/admin/getAllUsers', { headers })
      .subscribe(users => {
        this.users = users;
        // Initialiser la liste filtrée avec tous les utilisateurs au début
        this.filteredUsers = [...this.users];
      });
  }
  
  // Fonction pour filtrer les utilisateurs en fonction du terme de recherche
  filterUsers(): void {
    if (!this.searchTerm) {
      // Si le terme de recherche est vide, afficher tous les utilisateurs
      this.filteredUsers = [...this.users];
    } else {
      // Filtrer les utilisateurs en fonction du terme de recherche
      this.filteredUsers = this.users.filter(user =>
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  

  

  editUser(userId: number): void {
    // Redirigez l'utilisateur vers la page d'édition de l'utilisateur avec l'ID spécifié
    // Implémentez cette méthode en fonction de votre routage et de votre logique d'édition
  }

  deleteUser(userId: number): void {
    // Obtenir le token d'authentification stocké localement
    const token = localStorage.getItem('token');

    // Créer un en-tête HTTP avec le token d'authentification
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Utiliser l'en-tête dans une requête HTTP pour supprimer l'utilisateur
    this.http.delete<any>(`http://localhost:8081/api/v1/admin/deleteUser/${userId}`, { headers })
      .subscribe(() => {
        // Mettre à jour la liste des utilisateurs après la suppression
        this.getAllUsers();
      });
  }
  banUser(userId: number): void{ }

}
