import { Injectable } from '@angular/core';
import { Training } from '../_models/Training';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private baseUrl = 'http://localhost:8081/Pi/training';

  constructor(private http: HttpClient) { }

  getAllTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.baseUrl}/getAllTrainings`);
  }
  getTrainingsCountPerMonth(): Observable<{ month: string, count: number }[]> {
    return this.getAllTrainings().pipe(
      map(trainings => {
        const trainingCountsPerMonth: { [key: string]: number } = {};
        trainings.forEach(training => {
          const monthYear = new Date(training.trainingsDate).toLocaleString('default', { month: 'long', year: 'numeric' });
          trainingCountsPerMonth[monthYear] = (trainingCountsPerMonth[monthYear] || 0) + 1;
        });
        const uniqueMonths = Object.keys(trainingCountsPerMonth);
        return uniqueMonths.map(month => {
          return {
            month,
            count: trainingCountsPerMonth[month]
          };
        });
      })
    );
  }

  getTrainingById(id: number): Observable<Training> {
    return this.http.get<Training>(`${this.baseUrl}/getTrainingById/${id}`);
  }

  addTraining(training: Training): Observable<Training> {
    return this.http.post<Training>(`${this.baseUrl}/addTraining`, training);
  }

  deleteTraining(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteTraining/${id}`);
  }

  updateTraining(id: number, updatedTraining: Training): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/updateTraining/${id}`, updatedTraining);
  }

  uploadFile(trainingId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/${trainingId}/file`, formData);
  }

  uploadImage(trainingId: number, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(`${this.baseUrl}/${trainingId}/image`, formData);
  }

  getImageForTraining(trainingId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${trainingId}/image`, { responseType: 'blob' });
  }
  addConsultantsToTraining(trainingId: number, consultants: string[]): Observable<any> {
    const url = `${this.baseUrl}/${trainingId}/addConsultants`;
    return this.http.post<any>(url, consultants);
  }
  getConsultantsAddedToTraining(trainingId: number): Observable<string[]> {
    const url = `${this.baseUrl}/${trainingId}/consultants`;
    return this.http.get<string[]>(url);
  }

}
