import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthStoreService} from 'src/app/services/vault/auth-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authStore: AuthStoreService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let authorized = this.authStore.isDataValid();
    if (route.routeConfig?.path == 'dashboard') {
      return authorized ? true : this.router.createUrlTree(['/login']);
    } else if (route.routeConfig?.path == 'login') {
      return authorized ? this.router.createUrlTree(['/dashboard']) : true;
    } else return false;
  }

}
