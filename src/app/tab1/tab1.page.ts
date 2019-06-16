import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) { }

  public async logout(): Promise<void> {
    const loading = await this.loadingCtrl.create();
    loading.present();
    await this.authService.logout();
    this.navCtrl.navigateRoot('/login');
    loading.dismiss();
  }

}
