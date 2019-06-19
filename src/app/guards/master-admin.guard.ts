import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Role } from './../models/role.enum';
import { User } from './../models/user';

import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';

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
    const userId$: Observable<string> = this.authService.authUser$
      .pipe(
        switchMap((user: firebase.User) => {
          if (user) {
            return of(user.uid);
          } else {
            return of(null);
          }
        })
      );

    return userId$.pipe(
      switchMap((userId: string) => {
        if (userId) {
          return this.userService.getUser(userId)
            .pipe(
              switchMap((user: User) => {
                const isMasterAdmin = user.role === Role.MASTER_ADMIN;
                if (!isMasterAdmin) {
                  this.router.navigateByUrl('/tabs');
                }
                return of(isMasterAdmin);
              })
            );
        } else {
          this.router.navigateByUrl('/tabs');
          return of(false);
        }
      }),
    );
  }

}
