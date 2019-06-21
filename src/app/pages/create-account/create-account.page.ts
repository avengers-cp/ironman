import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import * as _ from 'lodash';
import { Gender } from 'src/app/interfaces/gender';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  
  public createAccountForm: FormGroup;
  public genders: string[];

  constructor(
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private toastService: ToastService
  ) { 
    this.genders = _.values(Gender);
  }

  ngOnInit() {
    this.createAccountForm = this.formbuilder.group({
      firstName: [
        '',
        Validators.required
      ],
      lastName: [
        '',
        Validators.required
      ],
      gender: [
        '',
        Validators.required
      ],
      dateOfBirth: [
        '',
        Validators.required
      ],
      email: [
        '',
        Validators.compose([Validators.email, Validators.required, Validators.pattern('^[^\s@]+@[^\s@]+\.[^\s@]{2,}$')])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      confirmPassword: [
        '',
        Validators.compose([Validators.required, this.validatePassword('password')])
      ]
    });
  }

  public async onSubmit(): Promise<void> {
    if (this.createAccountForm.valid) {
      const loading = await this.loadingCtrl.create();
      loading.present();
      const { dateOfBirth, email, firstName, gender, lastName, password } = this.createAccountForm.value;
      try {
        await this.authService.createUser(dateOfBirth, email, firstName, gender, lastName, password);
        this.toastService.showSuccessToast('Congratulations, you have successfully signed up!');
        this.navCtrl.navigateRoot('/tabs/tab1');
        this.createAccountForm.reset();
      } catch (error) {
        this.toastService.showErrorToast('An error occured. Please try again');
      } finally {
        loading.dismiss();
      }
    } else {
      this.toastService.showInfoToast('Please ensure all fields have been filled out correctly');
    }
  }

  public validatePassword(password): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const input = control.value;
      const isValid = control.root.value[password] == input
      if (!isValid) {
        return {
          'validatePassword': { isValid }
        }
      }
      else {
        return null;
      }
    }
  }
}
