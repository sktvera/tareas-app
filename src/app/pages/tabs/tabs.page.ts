import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';import {
  addCircleOutline,
  listOutline,
  checkmarkDoneOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class TabsPage {
  addIcon = addCircleOutline;
  listIcon = listOutline;
  doneIcon = checkmarkDoneOutline;

}