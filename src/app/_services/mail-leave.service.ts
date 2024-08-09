import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MailLeaveService {
  private baseUrl = 'http://localhost:8081'; // Mettez ici l'URL de votre backend

  constructor(private http: HttpClient) { }

  sendMail(formData: FormData): void {
    this.http.post(`${this.baseUrl}/mail/send-email`, formData)
      .subscribe(
        () => {
          console.log('Email sent successfully!');
          alert('Email envoyé avec succès!');
        },
        error => {
          console.error('An error occurred while sending the email:', error);
          alert('Une erreur s\'est produite lors de l\'envoi de l\'email.');
        }
      );
  }
}
