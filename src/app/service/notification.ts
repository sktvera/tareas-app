import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastCtrl: ToastController) {}

  /**
   * Muestra una notificación tipo Toast con estilo personalizado.
   * @param message Texto a mostrar
   * @param type 'success' | 'error' | 'info'
   * @param icon Icono opcional (nombre del icono registrado en minúsculas con guiones)
   */
  async show(
    message: string,
    type: 'success' | 'error' | 'info' = 'success',
    icon?: string
  ): Promise<void> {

    const defaultIcons = {
      success: 'checkmark-circle-outline',
      error: 'alert-circle-outline',
      info: 'information-circle-outline',
    };

    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'top',
      icon: icon ?? defaultIcons[type],
      cssClass: `custom-toast toast-${type}`,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });

    await toast.present();
  }
}