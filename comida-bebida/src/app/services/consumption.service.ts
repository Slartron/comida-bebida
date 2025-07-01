import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { catchError, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Consumption } from '../models/consumption';

@Injectable({
  providedIn: 'root',
})
export class ConsumptionService extends ApiService {
  constructor(private http: HttpClient) {
    super();
  }

  getCategories(): Observable<Category[]> {
    // TODO: fix call
    return this.http.get<Category[]>('https://localhost:54321').pipe(
      catchError((error) => {
        console.error('Fehler beim Abrufen der Kategorien:', error);
        return of([]); // Rückgabe eines leeren Arrays bei Fehler
      })
    );
  }

  getConsumptions(searchName: string): Observable<Consumption[]> {
    // TODO: fix call
    return this.http.get<Consumption[]>('https://localhost:54321').pipe(
      catchError((error) => {
        console.error('Fehler beim Abrufen der Kategorien:', error);
        return of([]); // Rückgabe eines leeren Arrays bei Fehler
      })
    );
  }
}
