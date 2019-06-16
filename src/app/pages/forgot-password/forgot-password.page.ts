import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  public forgotPasswordForm: FormGroup;
  constructor(
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formbuilder.group({
      email: [
        '',
        Validators.compose([Validators.email, Validators.required])
      ]
    });
  }

  public async onSubmit(): Promise<void> {
    if (this.forgotPasswordForm.valid) {
      const loading = await this.loadingCtrl.create();
      loading.present();
      const email = this.forgotPasswordForm.value.email;
      try {
        await this.authService.sendPasswordResetEmail(email);
        this.navCtrl.navigateRoot('/login');
        this.forgotPasswordForm.reset();
      } catch (error) {
        this.toastService.showErrorToast('The email address does not exist. Please try again');
      } finally {
        loading.dismiss();
      }
    } else {
      this.toastService.showInfoToast('Please ensure all fields have been filled out correctly');
    }
  }

}
