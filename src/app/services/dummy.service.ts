import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Consumption } from '../models/consumption';

@Injectable({
  providedIn: 'root',
})
export class DummyService implements ApiService {
  private storage = new Map<string, Consumption[]>();

  getConsumptions(searchName: string): Observable<Consumption[]> {
    return new Observable<Consumption[]>((observer) => {
      observer.next(this.storage.get(searchName) || []);
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

  saveConsumptions(
    memberName: string,
    newConsumptions: { [catId: string]: number }
  ): Observable<Consumption[]> {
    const consmpt = this.storage.get(memberName) || [];
    for (const [catId, quantity] of Object.entries(newConsumptions)) {
      const existingConsumption = consmpt.find((c) => c.categoryId === catId);
      if (existingConsumption) {
        existingConsumption.quantity += quantity;
      } else {
        consmpt.push({ categoryId: catId, quantity });
      }
    }
    this.storage.set(memberName, consmpt);
    return this.getConsumptions(memberName);
  }
}
