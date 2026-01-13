import { Component } from '@angular/core';
import { 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel,
  IonRouterOutlet 
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import {
  addCircleOutline,
  listOutline,
  checkmarkDoneOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    RouterModule
  ],
})
export class TabsPage {
  addIcon = addCircleOutline;
  listIcon = listOutline;
  doneIcon = checkmarkDoneOutline;

}