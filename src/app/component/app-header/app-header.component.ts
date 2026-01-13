import { Component } from '@angular/core';
import { IonToolbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pp-app-header',
  standalone: true,
  imports: [IonToolbar, CommonModule],
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {}