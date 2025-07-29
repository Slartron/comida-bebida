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
    // TODO: fix call. Das Backend ist noch nicht implementiert.
    return this.http.get<Category[]>('https://localhost:54321').pipe(
      catchError((error) => {
        console.error('Fehler beim Abrufen der Kategorien:', error);
        return of([]); // Rückgabe eines leeren Arrays bei Fehler
      })
    );
  }

  getConsumptions(searchName: string): Observable<Consumption[]> {
    // TODO: fix call. Das Backend ist noch nicht implementiert.
    return this.http.get<Consumption[]>('https://localhost:54321').pipe(
      catchError((error) => {
        console.error('Fehler beim Abrufen der Kategorien:', error);
        return of([]); // Rückgabe eines leeren Arrays bei Fehler
      })
    );
  }

  saveConsumptions(
    memberName: string,
    newConsumptions: { [catId: string]: number }
  ): Observable<Consumption[]> {
    //TODO: fix call. Das Backend ist noch nicht implementiert.
    return this.http
      .post<Consumption[]>('https://localhost:54321', {
        memberName: memberName,
        newConsumptions: newConsumptions,
      })
      .pipe(
        catchError((error) => {
          console.error('Fehler beim Speichern der Verbrauchsdaten:', error);
          return of([]); // Rückgabe eines leeren Arrays bei Fehler
        })
      );
  }
}
