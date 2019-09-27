import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { ToastService } from 'src/app/services/toast.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastService: ToastService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  public createAccount(): void {
    this.toastService.showInfoToast('This feature has not yet been implemented');
  }

  /**
   * Submit the form and attempt to login to the app.
   * @returns - Resolves when the login attempt has finished.
   */
  public async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      const loading = await this.loadingCtrl.create();
      loading.present();
      const { email, password } = this.loginForm.value;
      try {
        await this.userService.login(email, password);
        this.router.navigateByUrl('/tabs/tab1');
        this.loginForm.reset();
      } catch (error) {
        this.toastService.showErrorToast('Invalid email or password. Please try again');
      } finally {
        loading.dismiss();
      }
    } else {
      this.toastService.showInfoToast('Please ensure all fields have been filled out correctly');
    }
  }

  /**
   * Initialise the login form.
   */
  private initForm() {
    this.loginForm = this.formbuilder.group({
      email: [
        '',
        Validators.compose([Validators.email, Validators.required])
      ],
      password: [
        '',
        Validators.required
      ]
    });
  }

}
