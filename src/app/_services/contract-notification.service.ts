import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractNotificationService {

  constructor(private http: HttpClient) { }

  checkEndDateAndSendNotification(contractEndDate: Date): Observable<any> {
    const today = new Date();
    if (this.isSameDate(today, contractEndDate)) {
      // Send notification logic
      return this.sendNotification(); // Call your notification sending function
    } else {
      return new Observable(); // Return empty observable if no notification sent
    }
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  private sendNotification(): Observable<any> {
    // Implement your notification sending logic here
    // You may use a notification service or an external API for sending notifications
    console.log('Notification sent: Contract end date is today!');

    return this.http.post<any>(/*'http://localhost:8081/empContracts'*/'/back/empContracts', { message: 'Contract end date is today!' });
  }
}
