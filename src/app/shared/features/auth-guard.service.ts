import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // check if user is accessing admin pages
    // currently will block them from seeing due to lack of role based implementation on user authentication
    if (state && state.url && state.url.includes('admin')) {
      this.router.navigate(['403']);
      return false;
    }

    return true;
  }
}
