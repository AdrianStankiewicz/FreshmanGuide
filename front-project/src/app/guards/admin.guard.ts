import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('freshmanGuideJWT');

    if (token) {
      const isAdmin = this.verifyFakeToken(token);

      if (!isAdmin) {
        this.router.navigateByUrl('/admin/zaloguj');
        return false;
      }

      return true;
    } else {
      this.router.navigateByUrl('/admin/zaloguj');
      return false;
    }
  }

  private verifyFakeToken(token: string): boolean {
    try {
      const decoded = JSON.parse(atob(token));
      const isAdmin = decoded.isAdmin;
      return isAdmin === true;
    } catch (error) {
      return false;
    }
  }
}
