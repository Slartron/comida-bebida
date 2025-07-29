import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { DummyService } from './dummy.service';
import { Consumption } from '../models/consumption';

@Injectable({
  providedIn: 'root',
  useClass: DummyService,
})
export class ApiFacade {
  constructor(private apiService: ApiService) {}

  getCategories(): Observable<Category[]> {
    return this.apiService.getCategories();
  }

  getConsumptions(searchName: string): Observable<Consumption[]> {
    return this.apiService.getConsumptions(searchName);
  }

  saveConsumptions(
    memberName: string,
    newConsumptions: { [catId: string]: number }
  ): Observable<Consumption[]> {
    return this.apiService.saveConsumptions(memberName, newConsumptions);
  }
}
