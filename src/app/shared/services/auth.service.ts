import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { SharedService } from './shared.service';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private sharedService: SharedService) {
  }

  authenticate(data) {
    return this.http.post(environment.baseUrl + '/authentication/login', data)
      .pipe(catchError((response) => {
        this.sharedService.toastInfo(response.error.message);
        return throwError(response.error.message);
      }));
  }
}
