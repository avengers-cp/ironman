import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Role } from '../models/role.enum';
import { User } from './../models/user';

import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public user$: Observable<User>;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private userService: UserService
  ) { }

  ngOnInit() {
    const userId$ = this.authService.authUser$
      .pipe(
        switchMap((authUser: firebase.User) => {
          return of(authUser.uid);
        })
      );

    this.user$ = userId$
      .pipe(
        switchMap((userId: string) => {
          return this.userService.getUser(userId);
        })
      );
  }

  public get masterAdminRole(): Role.MASTER_ADMIN {
    return Role.MASTER_ADMIN;
  }

  public async logout(): Promise<void> {
    const loading = await this.loadingCtrl.create();
    loading.present();
    await this.authService.logout();
    this.navCtrl.navigateRoot('/login');
    loading.dismiss();
  }
}
