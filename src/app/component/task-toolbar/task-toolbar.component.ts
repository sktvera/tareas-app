import { Component, EventEmitter, Input, Output } from '@angular/core';
import { 
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonSpinner,
  IonBadge
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  addCircleOutline,
  funnelOutline,
  arrowUpOutline,
  arrowDownOutline
} from 'ionicons/icons';

export type SortDirection = 'ASC' | 'DESC';

@Component({
  selector: 'app-task-toolbar',
  standalone: true,
  imports: [
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonSearchbar,
    IonSpinner,
    IonBadge,
    CommonModule,
    FormsModule
  ],
  templateUrl: './task-toolbar.component.html',
  styleUrls: ['./task-toolbar.component.scss'],
})
export class TaskToolbarComponent {

  @Input() showCreate = false;
  @Input() activeFiltersCount = 0;
 addIcon = addCircleOutline;
  funnelIcon = funnelOutline;
  arrowUpIcon = arrowUpOutline;
  arrowDownIcon = arrowDownOutline;
  searchText = '';
  sortDirection: SortDirection = 'ASC';
  loading = false;

  @Output() create = new EventEmitter<void>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() filterClick = new EventEmitter<void>();
  @Output() sortChange = new EventEmitter<SortDirection>();

  private typingTimeout?: any;

  onInput(value: string) {
    this.searchText = value;
    this.loading = true;

    // Reinicia el timeout cada vez que escribe
    if (this.typingTimeout) clearTimeout(this.typingTimeout);

    // Cuando deja de escribir 1s → dispara búsqueda y quita spinner
    this.typingTimeout = setTimeout(() => {
      this.loading = false;
      this.searchChange.emit(this.searchText);
    }, 1000);
  }

  clearSearch() {
    this.searchText = '';
    this.loading = false;
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    this.searchChange.emit('');
  }

  toggleSort() {
    this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
    this.sortChange.emit(this.sortDirection);
  }
}