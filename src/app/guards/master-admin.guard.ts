import { User } from './../interfaces/user';
import { Role } from './../interfaces/role.enum';
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterAdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getLoggedInUser().then((authUser: firebase.User) => {
      if (authUser) {
        // User is logged in.
        return this.userService.loadUser(authUser.uid).then((user: User) => {
          if (user.role === Role.MASTER_ADMIN) {
            return true;
          } else {
            // User is not a master_admin
            this.router.navigateByUrl('/tabs/tab1');
            return false;
          }
        }).catch((error) => {
          this.router.navigateByUrl('/tabs/tab1');
          return false;
        });
      } else {
        // User is not logged in so go to login page.
        this.router.navigateByUrl('/login');
        return false;
      }
    }).catch((error) => {
      // User is not logged in so go to login page.
      this.router.navigateByUrl('/login');
      return false;
    });
  }

}
