import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { HttpHeaders } from '@angular/common/http';
import { Message } from 'src/app/_models/message';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8081/api/v1/admin';
  private baseUrl = 'http://localhost:8081/api/messages';

  baseUrl1 = "http://localhost:8081";



  constructor(private http: HttpClient) { }
  ////////////////////////////////////////////////////////

  getAll() {
    return this.http.get<User[]>(this.baseUrl1 + "/user/getall")
  }

  adduser(user: User): Observable<Object> {
    return this.http.post(this.baseUrl1 + "/user/add", user);
  }

  getUserByUsername(username: any) {
    return this.http.get<User>(this.baseUrl1 + "/user/getbyusername/" + username)
  }
  /////////////////////////////////////////////////////////////

  getAllUsers(): Observable<User[]> {
    // Assuming you store the JWT token in localStorage after login
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<User[]>(`${this.apiUrl}/getAllUsers`);
  }

  getUserById(userId: number): Observable<User> {
    // Récupérer le jeton d'authentification depuis le stockage local
    const token = localStorage.getItem('token');
     // Afficher le jeton dans la console
  console.log('Authentication token:', token);
    
    // Vérifier si le token est disponible
    if (token) {
      // Construire les en-têtes avec le token d'authentification
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      
      // Envoyer la requête GET avec les en-têtes d'authentification
      return this.http.get<User>(`${this.apiUrl}/getUserById/${userId}`, httpOptions);
    } else {
      // Gérer le cas où le token n'est pas disponible
      throw new Error('Authentication token not found');
    }
  }

  registerUser(userData: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addUser`, userData);
  }

  updateUser(userId: number, userData: User): Observable<any> {
    // Assuming you store the JWT token in localStorage after login
    const token = localStorage.getItem('authToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.put<any>(`${this.apiUrl}/updateUser/${userId}`, userData);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteUser/${userId}`);
  }

  getMyProfile(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  
    return this.http.get<User>(`${this.apiUrl}user/profile`, httpOptions); // Note: Removed the slash before "user/profile"
  }

  updateProfile(user: User): Observable<any> {
    const token = localStorage.getItem('authToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  
    return this.http.put(`${this.apiUrl}user/profile`, user, httpOptions); // Note: Removed the slash before "user/profile"
  }


  getCurrentUser(): Observable<User> {
    const token = localStorage.getItem('token');
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      };
      return this.http.get<User>(`http://localhost:8081/api/auth/user/profile`, httpOptions);
    } else {
      throw new Error('Authentication token not found');
    }
  }

  getConversation(senderId: number, recipientId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/conversation/${senderId}/${recipientId}`);
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}/sendMessage`, message);
  }
}
