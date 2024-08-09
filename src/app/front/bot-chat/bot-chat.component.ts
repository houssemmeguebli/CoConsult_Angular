import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bot-chat',
  templateUrl: './bot-chat.component.html',
  styleUrls: ['./bot-chat.component.css']
})
export class BotChatComponent {
  private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  private apiKey = 'AIzaSyAtfLJnzH1iBkSHM-AF8CwCDVXw0vvpR0U'; // Remplacez par votre véritable clé d'API
  textInput: string = '';
  response: any;

  constructor(private http: HttpClient) {}

  generateContent(text: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') // Récupérer le jeton JWT depuis le local storage
    });

    const params = new HttpParams()
      .set('key', this.apiKey);

    const body = {
      contents: [
        {
          parts: [
            {
              text: text
            }
          ]
        }
      ]
    };

    return this.http.post(this.apiUrl, body, { headers, params });
  }

  onSubmit() {
    this.generateContent(this.textInput).subscribe(
      response => {
        // Traitez la réponse de l'API ici
        console.log(response);
        this.response = response;
      },
      error => {
        // Gérez les erreurs ici
        console.error('Error:', error);
      }
    );
  }
}
