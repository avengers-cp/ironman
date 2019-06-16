import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastConfig } from '../interfaces/toast-config';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  /**
   * Show an error toast for a set amount of time.
   * @param message - The error message to be displayed.
   * @param duration - The duration to display the toast for. Default is 2000 milliseconds.
   */
  public showErrorToast(message: string, duration: number = 3000): Promise<void> {
    const toastConfig: ToastConfig = {
      message,
      duration,
      keyboardClose: true,
      color: 'danger',
      cssClass: 'toast-center-text'
    };
    return this.createToast(toastConfig);
  }

  /**
   * Show a basic info toast for a set amount of time.
   * @param message - The message to be displayed on the toast.
   * @param duration - The duration to display the toast for. Default is 2000 milliseconds.
   */
  public showInfoToast(message: string, duration: number = 2000): Promise<void> {
    const toastConfig: ToastConfig = {
      message,
      duration,
      keyboardClose: true,
      cssClass: 'toast-center-text'
    };
    return this.createToast(toastConfig);
  }

  /**
   * Show an success toast for a set amount of time.
   * @param message - The success message to be displayed.
   * @param duration - The duration to display the toast for. Default is 2000 milliseconds.
   */
  public showSuccessToast(message: string, duration: number = 2000): Promise<void> {
    const toastConfig: ToastConfig = {
      message,
      duration,
      keyboardClose: true,
      color: 'success',
      cssClass: 'toast-center-text'
    };
    return this.createToast(toastConfig);
  }

  /**
   * Create a toast.
   * @param toastConfig - Settings to configure the toast.
   * @returns - Resolves when the toast is created.
   */
  private async createToast(toastConfig: ToastConfig): Promise<void> {
    const toast = await this.toastCtrl.create(toastConfig);
    await toast.present();
  }
}
