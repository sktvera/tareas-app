import { Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskCategory } from '../../models/task.model';

@Component({
  selector: 'app-task-filters',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './task-filters.component.html',
})
export class TaskFiltersComponent {

  @Output() categoryChange = new EventEmitter<TaskCategory | undefined>();
  @Output() searchChange = new EventEmitter<string>();

  selectedCategory?: TaskCategory;
  searchText = '';

  categories: TaskCategory[] = [
    'PERSONAL',
    'TRABAJO',
    'ESTUDIO',
    'OTROS',
  ];

  onCategoryChange(): void {
    this.categoryChange.emit(this.selectedCategory);
  }

  onSearchChange(): void {
    this.searchChange.emit(this.searchText);
  }

  clearFilters(): void {
    this.selectedCategory = undefined;
    this.searchText = '';
    this.categoryChange.emit(undefined);
    this.searchChange.emit('');
  }
}