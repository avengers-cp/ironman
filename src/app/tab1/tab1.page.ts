import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from './../interfaces/user';
import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';

import * as _ from 'lodash';
import { Role } from '../interfaces/role.enum';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private userService: UserService
  ) { }

  public get masterAdminRole(): Role.MASTER_ADMIN {
    return Role.MASTER_ADMIN;
  }

  public get user$(): Observable<User> {
    return this.userService.user$;
  }

  public async logout(): Promise<void> {
    const loading = await this.loadingCtrl.create();
    loading.present();
    await this.authService.logout();
    this.navCtrl.navigateRoot('/login');
    loading.dismiss();
  }
}
