import { Injectable } from '@angular/core';
import { Router,CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {

  constructor(public router: Router,public auth: AuthenticationService){}

  canActivate(route, state: RouterStateSnapshot):boolean{
   if (this.auth.isAuthenticated()) return true;

    this.router.navigate(['/login'],{queryParams:{returnUrl: state.url}}); 
  }
}
