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
   * @param icon Nombre del icono de ionicons
   */
  async show(message: string, type: 'success' | 'error' | 'info' = 'success', icon?: string) {
    
    // Definimos iconos por defecto según el tipo si no se envía uno
    const defaultIcons = {
      success: 'checkmark-circle-outline',
      error: 'alert-circle-outline',
      info: 'information-circle-outline'
    };

    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2500,
      position: 'top',
      icon: icon || defaultIcons[type],
      cssClass: `custom-toast toast-${type}`, // Clases dinámicas para el CSS
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