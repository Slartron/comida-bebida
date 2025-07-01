import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ApiService } from './api.service';
import { Inject, Injectable } from '@angular/core';
import { Consumption } from '../models/consumption';

@Injectable({
  providedIn: 'root',
})
export class DummyService implements ApiService {
  getConsumptions(searchName: string): Observable<Consumption[]> {
    return new Observable((observer) => {
      observer.next([
        { categoryId: '1', quantity: 2 },
        { categoryId: '2', quantity: 5 },
      ]);
      observer.complete();
    });
  }

  getCategories(): Observable<Category[]> {
    return new Observable<Category[]>((observer) => {
      observer.next([
        { id: '1', description: 'Bier', price: 3.5 },
        { id: '2', description: 'Wein', price: 5.0 },
        { id: '3', description: 'Wasser', price: 1.0 },
        { id: '4', description: 'Cola', price: 2.0 },
        { id: '5', description: 'Saft', price: 2.5 },
        { id: '6', description: 'Snacks', price: 4.0 },
      ]);
      observer.complete();
    });
  }
}
