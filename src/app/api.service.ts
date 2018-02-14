import { Injectable } from '@angular/core';
import { Trips } from './api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

type Criteria = 'cheapter' | 'fastest';

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getAllTrips(): Observable<Trips> {
    return this.httpClient.get<Trips>('/assets/response.json');
  }

}
