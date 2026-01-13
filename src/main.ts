import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { RouteReuseStrategy } from '@angular/router';

import { addIcons } from 'ionicons';
import {
  sparklesOutline,
  saveOutline,
  personOutline,
  peopleOutline,
  checkmarkDoneCircleOutline,
  arrowBackCircleOutline,
  trashOutline,
  alertCircleOutline,
  informationCircleOutline,
  checkmarkCircleOutline,
  // Iconos de tabs
  addCircleOutline,
  listOutline,
  checkmarkDoneOutline,
  // Iconos de toolbar
  funnelOutline,
  arrowUpOutline,
  arrowDownOutline,
  // Iconos de páginas
  createOutline,
  clipboardOutline,
  chevronForwardOutline,
  // Iconos de formularios
  lockClosedOutline,
  chevronDownOutline,
} from 'ionicons/icons';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

/* REGISTRO GLOBAL DE TODOS LOS ICONOS */
addIcons({
  'sparkles-outline': sparklesOutline,
  'save-outline': saveOutline,
  'person-outline': personOutline,
  'people-outline': peopleOutline,
  'checkmark-done-circle-outline': checkmarkDoneCircleOutline,
  'arrow-back-circle-outline': arrowBackCircleOutline,
  'trash-outline': trashOutline,
  'alert-circle-outline': alertCircleOutline,
  'information-circle-outline': informationCircleOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  // Tabs
  'add-circle-outline': addCircleOutline,
  'list-outline': listOutline,
  'checkmark-done-outline': checkmarkDoneOutline,
  // Toolbar
  'funnel-outline': funnelOutline,
  'arrow-up-outline': arrowUpOutline,
  'arrow-down-outline': arrowDownOutline,
  // Páginas
  'create-outline': createOutline,
  'clipboard-outline': clipboardOutline,
  'chevron-forward-outline': chevronForwardOutline,
  // Formularios
  'lock-closed-outline': lockClosedOutline,
  'chevron-down-outline': chevronDownOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideRouter(routes),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
});