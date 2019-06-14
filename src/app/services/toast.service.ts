import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  /**
   * Show a basic info toast for a set amount of time.
   * @param message - The message to be displayed on the toast.
   * @param duration - The duration to display the toast for. Default is 2000 milliseconds.
   */
  public async showInfoToast(message: string, duration: number = 2000): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      keyboardClose: true
    });
    await toast.present();
  }
}
