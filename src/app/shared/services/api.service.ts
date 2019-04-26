import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  loadZions(region) {
    return this.http.get(environment.baseUrl + '/regions/' + region + '/zions');
  }
}
