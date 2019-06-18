import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterAdminGuard implements CanActivate {

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // TODO: calculate real guard.
    return true;
  }

}
