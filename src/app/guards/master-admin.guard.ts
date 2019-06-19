import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

import { Role } from './../models/role.enum';
import { User } from './../models/user';

import { UserService } from './../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class MasterAdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.user$.pipe(
      take(1),
      map((user: User) => !!user && user.role === Role.MASTER_ADMIN),
      tap((isMasterAdmin: boolean) => {
        if (!isMasterAdmin) {
          this.router.navigateByUrl('/tabs');
        }
      })
    );
  }

}
