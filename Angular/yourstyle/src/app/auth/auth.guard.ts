import { UserServiceService } from './../service/user-service.service';
import { Router } from '@angular/router'
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userservice : UserServiceService, private router : Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if(!this.userservice.isLoggedIn()) {
        this.router.navigateByUrl('/login');
        this.userservice.deleteToken();
        return false;
      }
    return true;
  }
  
}
