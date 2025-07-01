import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { Consumption } from '../models/consumption';

export abstract class ApiService {
  abstract getConsumptions(searchName: string): Observable<Consumption[]>;
  abstract getCategories(): Observable<Category[]>;
}
