import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

export type SortDirection = 'ASC' | 'DESC';

@Component({
  selector: 'app-task-toolbar',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './task-toolbar.component.html',
  styleUrls: ['./task-toolbar.component.scss'],
})
export class TaskToolbarComponent {

  /* ===== CONFIG ===== */
  @Input() showCreate = false;
  @Input() activeFiltersCount = 0;

  /* ===== STATE ===== */
  searchText = '';
  sortDirection: SortDirection = 'ASC';

  /* ===== EVENTS ===== */
  @Output() create = new EventEmitter<void>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() filterClick = new EventEmitter<void>();
  @Output() sortChange = new EventEmitter<SortDirection>();

  onSearch(value: string) {
    this.searchText = value;
    this.searchChange.emit(value);
  }

  toggleSort() {
    this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
    this.sortChange.emit(this.sortDirection);
  }
}