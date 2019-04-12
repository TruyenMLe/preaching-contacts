import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { SharedService } from './shared.service';

@Injectable()
export class AuthService {
  private documentIsAccessible: boolean;

  constructor(@Inject( DOCUMENT ) private document: any,
              @Inject( PLATFORM_ID ) private platformId: InjectionToken<any>,
              private http: HttpClient,
              private sharedService: SharedService) {
    this.documentIsAccessible = isPlatformBrowser( this.platformId );
  }

  authenticate(data) {
    return this.http.post(environment.baseUrl + '/authentication/login', data, {withCredentials: true})
      .pipe(catchError((response) => {
        this.sharedService.toastInfo(response.error.message);
        return throwError(response.error.message);
      }));
  }

  checkSessionToken() {
    return this.http.get(environment.baseUrl + '/authentication/session')
      .pipe(catchError(() => {
        return of({valid: false});
      }));
  }
}
