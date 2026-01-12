import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskService } from '../../../service/task.service';
import { Task, TaskCategory } from '../../../models/task.model';

import { TaskFiltersComponent } from '../../../component/task-filters/task-filters.component';
import { AppHeaderComponent } from '../../../component/app-header/app-header.component';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.page.html',
  styleUrls: ['./completed-tasks.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    TaskFiltersComponent,
    AppHeaderComponent,
    FormsModule
  ],
})
export class CompletedTasksPage {

  tasks: Task[] = [];

  selectedCategory?: TaskCategory;
  searchText = '';

  constructor(private taskService: TaskService) {}

  ionViewWillEnter(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasksByStatus(
      'COMPLETED',
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

  returnTask(id: number): void {
    this.taskService.returnToAssigned(id);
    this.loadTasks();
  }
}