import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterService } from './Register.service';

@Injectable({
  providedIn: 'root'
})
export class ActivateAdminGuard implements CanActivate {

  constructor(private router: Router, private registerService: RegisterService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.registerService.isadmin()) {
      return true;
    } else {
      return this.router.parseUrl('Admin');
    }
  }
}
