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
import { provideAnimations } from '@angular/platform-browser/animations';

import { addIcons } from 'ionicons';
// ICONOS FUNCIONALES
import { 
  addCircleOutline,
  addOutline,
  closeOutline,
  searchOutline,
  funnelOutline,
  arrowUpOutline,
  arrowDownOutline,
  listOutline,
  checkmarkCircleOutline,
  checkmarkDoneOutline,
  trashOutline,
  chevronForwardOutline,
  chevronDownOutline,
  createOutline
} from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// ICONOS FUNCIONALES
addIcons({'create-outline': createOutline,
  'add-circle-outline': addCircleOutline,
  'add-outline': addOutline,
  'close-outline': closeOutline,   
  'search-outline': searchOutline, 
  'funnel-outline': funnelOutline,
  'arrow-up-outline': arrowUpOutline,
  'arrow-down-outline': arrowDownOutline,
  'list-outline': listOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'checkmark-done-outline': checkmarkDoneOutline,
  'trash-outline': trashOutline,
  'chevron-forward-outline': chevronForwardOutline,
  'chevron-down-outline': chevronDownOutline,
  
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimations()
  ],
});