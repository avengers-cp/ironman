import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Plugins } from '@capacitor/core';

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private platform: Platform,
    private userService: UserService
  ) {
    this.initializeApp();

    const authUser = this.authService.authenticatedUser;
    if (!authUser) {
      this.authService.isLoggedIn$.subscribe((user: firebase.User) => {
        if (user) {
          this.userService.loadUser(user.uid);
        }
      });
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      SplashScreen.hide();
    });
  }
}
