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
  checkmarkCircleOutline
} from 'ionicons/icons';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

/* ✅ REGISTRO GLOBAL */
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
});

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideRouter(routes),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
});