import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular
} from '@ionic/angular/standalone';
import { provideAnimations } from '@angular/platform-browser/animations'; // <-- IMPORTAR

import { addIcons } from 'ionicons';
/* ✅ REGISTRO EXPLÍCITO DE ICONOS */
import { 
  addCircleOutline, 
  addOutline, // Para el Tab de Crear
  closeOutline, 
  searchOutline, 
  funnelOutline, 
  arrowUpOutline, 
  arrowDownOutline, 
  clipboardOutline, 
  listOutline, // Para el Tab de Mis Tareas
  checkmarkCircleOutline, 
  checkmarkDoneOutline, // Para el Tab de Completadas
  createOutline, 
  trashOutline, 
  arrowBackCircleOutline, 
  chevronForwardOutline,
  sparklesOutline, // Para la guía del formulario
  folderOutline, // Para el modal de categorías
  folderOpenOutline,
  chevronDownOutline, // Para el select,
  alertCircleOutline,
  informationCircleOutline
} from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';



/* ✅ REGISTRO ACTUALIZADO */
addIcons({
  'add-circle-outline': addCircleOutline,
  'add-outline': addOutline,
  'close-outline': closeOutline,
  'search-outline': searchOutline,
  'funnel-outline': funnelOutline,
  'arrow-up-outline': arrowUpOutline,
  'arrow-down-outline': arrowDownOutline,
  'clipboard-outline': clipboardOutline,
  'list-outline': listOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'checkmark-done-outline': checkmarkDoneOutline,
  'create-outline': createOutline,
  'trash-outline': trashOutline,
  'arrow-back-circle-outline': arrowBackCircleOutline,
  'chevron-forward-outline': chevronForwardOutline,
  'sparkles-outline': sparklesOutline,
  'folder-outline': folderOutline,
  'folder-open-outline': folderOpenOutline,
  'chevron-down-outline': chevronDownOutline,


  'alert-circle-outline': alertCircleOutline,
  'information-circle-outline': informationCircleOutline
});
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimations(), // <-- HABILITA ANIMACIONES
  ],
});