import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ICar } from '../cars.interface';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  
  private apiUrl = environment.baseUrl;


  constructor(private http: HttpClient) { }

  public getCars(): Observable<ICar[]> {
    return this.http.get<ICar[]>(this.apiUrl);
  }
}
