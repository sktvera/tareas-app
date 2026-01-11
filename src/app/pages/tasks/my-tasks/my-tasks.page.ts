import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { TaskService } from '../../../service/task.service';
import { Task, TaskCategory } from '../../../models/task.model';

import { TaskFiltersComponent } from '../../../component/task-filters/task-filters.component';
import { EditTaskModalComponent } from '../../../component/edit-task-modal/edit-task-modal.component';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.page.html',
  styleUrls: ['./my-tasks.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    TaskFiltersComponent,
  ],
})
export class MyTasksPage {

  tasks: Task[] = [];

  selectedCategory?: TaskCategory;
  searchText = '';

  constructor(
    private taskService: TaskService,
    private modalController: ModalController
  ) {}

  ionViewWillEnter(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasksByStatus(
      'ASSIGNED',
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

  completeTask(id: number): void {
    this.taskService.completeTask(id);
    this.loadTasks();
  }

  discardTask(id: number): void {
    this.taskService.returnToPending(id);
    this.loadTasks();
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.loadTasks();
  }

  openEdit(task: Task): void {
    this.modalController
      .create({
        component: EditTaskModalComponent,
        componentProps: { task },
      })
      .then(modal => {
        modal.onDidDismiss().then(() => this.loadTasks());
        modal.present();
      });
  }
}