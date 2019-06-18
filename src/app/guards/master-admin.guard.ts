import { User } from './../interfaces/user';
import { Role } from './../interfaces/role.enum';
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    return new Promise<boolean>((resolve) => {
      this.authService.getLoggedInUser().then((authUser: firebase.User) => {
        if (authUser) {
          const unsubscribe$ = new Subject<void>();
          this.userService.user$.pipe(takeUntil(unsubscribe$)).subscribe((user: User) => {
            if (user) {
              if (user.role === Role.MASTER_ADMIN) {
                resolve(true);
              } else {
                this.router.navigateByUrl('/tabs');
                resolve(false);
              }
              unsubscribe$.next();
              unsubscribe$.complete();
            }
          });
        } else {
          // User is not logged in so go to login page.
          this.router.navigateByUrl('/login');
          resolve(false);
        }
      }).catch((error) => {
        // User is not logged in so go to login page.
        this.router.navigateByUrl('/login');
        resolve(false);
      });

    });
  }

}
