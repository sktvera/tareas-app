import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TaskService } from '../../../service/task.service';
import { Task, TaskCategory } from '../../../models/task.model';
import { TaskFiltersComponent } from '../../../component/task-filters/task-filters.component';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TaskFiltersComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateTaskPage {

  title = '';
  description = '';
  category: TaskCategory = 'PERSONAL';

  categories: TaskCategory[] = [
    'PERSONAL',
    'TRABAJO',
    'ESTUDIO',
    'OTROS',
  ];

  tasks: Task[] = [];

  selectedCategory?: TaskCategory;
  searchText = '';

  constructor(private taskService: TaskService) {}

  ionViewWillEnter(): void {
    this.loadTasks();
  }

  createTask(): void {
    if (!this.title.trim()) {
      return;
    }

    this.taskService.createTask(
      this.title,
      this.description,
      this.category
    );

    this.resetForm();
    this.loadTasks();
  }

  assignTask(id: number): void {
    this.taskService.assignTask(id);
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasksByStatus(
      'PENDING',
      this.selectedCategory,
      this.searchText
    );
  }

  onCategoryChange(category?: TaskCategory): void {
    this.selectedCategory = category;
    this.loadTasks();
  }

  onSearchChange(search: string): void {
    this.searchText = search;
    this.loadTasks();
  }

  private resetForm(): void {
    this.title = '';
    this.description = '';
    this.category = 'PERSONAL';
  }
}