import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';;
import { RegisterService } from './Register.service';

@Injectable({
  providedIn: 'root'
})
export class ActivateGuard implements CanActivate {

  constructor(private RegService: RegisterService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (!this.RegService.isLogin()) {
      alert("Login to view this page");
      this.router.navigate(['/Login'], { queryParams: { retUrl: route.url } });
      return false;
    }
    return true;
  }

}
