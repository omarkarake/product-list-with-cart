import { Injectable } from '@angular/core';
import { Dessert } from '../models/image.model';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private data = './assets/data.json';
  private dessertSubject = new BehaviorSubject<Dessert[]>([]);
  desserts$ = this.dessertSubject.asObservable();

  constructor(private http: HttpClient) {}

  init(): void {
    this.getDesserts();
  }

  getDesserts() {
    this.http
      .get<Dessert[]>(this.data)
      .pipe(
        catchError((error) => {
          console.log('Error fetching data: ', error);
          return of([]);
        })
      )
      .subscribe((data) => this.dessertSubject.next(data));
  }
}
