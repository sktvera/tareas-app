import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskService } from '../../../service/task.service';
import { Task, TaskCategory } from '../../../models/task.model';

import { TaskFiltersComponent } from '../../../component/task-filters/task-filters.component';
import { AppHeaderComponent } from '../../../component/app-header/app-header.component';
import { TaskToolbarComponent } from '../../../component/task-toolbar/task-toolbar.component';
import { ModalController } from '@ionic/angular';
import { CategoryFilterModalComponent } from '../../../component/category-filter-modal/category-filter-modal.component';

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
    FormsModule,
    TaskToolbarComponent,
  ],
})
export class CompletedTasksPage {

  tasks: Task[] = [];

  activeCategory?: TaskCategory;
  searchText = '';
  sortDirection: 'ASC' | 'DESC' = 'ASC';

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController
  ) {}

  ionViewWillEnter(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService
      .getTasksByStatus('COMPLETED', this.activeCategory, this.searchText)
      .sort((a, b) =>
        this.sortDirection === 'ASC'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );
  }

  onSearchChange(value: string): void {
    this.searchText = value;
    this.loadTasks();
  }

  onSortChange(direction: 'ASC' | 'DESC'): void {
    this.sortDirection = direction;
    this.loadTasks();
  }

  async openCategoryModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: CategoryFilterModalComponent,
      componentProps: { selected: this.activeCategory }
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data !== undefined) {
        this.activeCategory = data;
        this.loadTasks();
      }
    });

    await modal.present();
  }

  returnTask(id: number): void {
    this.taskService.returnToAssigned(id);
    this.loadTasks();
  }
}