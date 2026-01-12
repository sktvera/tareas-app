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

import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  closeOutline,
  searchOutline,
  funnelOutline,
  arrowUpOutline,
  arrowDownOutline,
  clipboardOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

/* ✅ REGISTRO EXPLÍCITO DE ICONOS */
addIcons({
  'add-circle-outline': addCircleOutline,
  'close-outline': closeOutline,
  'search-outline': searchOutline,
  'funnel-outline': funnelOutline,
  'arrow-up-outline': arrowUpOutline,
  'arrow-down-outline': arrowDownOutline,
  'clipboard-outline': clipboardOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});