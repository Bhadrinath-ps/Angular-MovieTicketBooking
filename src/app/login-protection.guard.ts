import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterService } from './Register.service';

@Injectable({
  providedIn: 'root'
})
export class LoginProtectionGuard implements CanActivate {

  constructor(private router: Router, private service: RegisterService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (!this.service.isLogin()) {
      return true;
    }
    return this.router.parseUrl('/');
  }
}
