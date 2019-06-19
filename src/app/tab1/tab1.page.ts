import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

import { Observable } from 'rxjs';

import { Role } from '../models/role.enum';
import { User } from './../models/user';

import { UserService } from './../services/user.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private userService: UserService
  ) { }

  public get user$(): Observable<User> {
    return this.userService.user$;
  }

  public get masterAdminRole(): Role.MASTER_ADMIN {
    return Role.MASTER_ADMIN;
  }

  public async logout(): Promise<void> {
    const loading = await this.loadingCtrl.create();
    loading.present();
    await this.userService.logout();
    this.navCtrl.navigateRoot('/login');
    loading.dismiss();
  }
}
