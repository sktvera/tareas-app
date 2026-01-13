import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskService } from '../../../service/task.service';
import { CategoryService } from '../../../service/category.service';
import { Task, TaskCategory } from '../../../models/task.model';

import { EditTaskModalComponent } from '../../../component/edit-task-modal/edit-task-modal.component';
import { AppHeaderComponent } from '../../../component/app-header/app-header.component';
import { TaskToolbarComponent } from '../../../component/task-toolbar/task-toolbar.component';
import { CategoryFilterModalComponent } from '../../../component/category-filter-modal/category-filter-modal.component';

import {
  arrowBackCircleOutline,
  createOutline,
  trashOutline,
  checkmarkCircleOutline,
  clipboardOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.page.html',
  styleUrls: ['./my-tasks.page.scss','../../../shared/scss/tasks.shared.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppHeaderComponent,
    TaskToolbarComponent,
  ],
})
export class MyTasksPage implements OnInit {

  tasks: Task[] = [];
  categories: TaskCategory[] = [];
  searchText = '';
  sortDirection: 'ASC' | 'DESC' = 'ASC';
  activeCategoryFilters: TaskCategory[] = [];

    arrowBackCircleIcon = arrowBackCircleOutline;
  createIcon = createOutline;
  trashIcon = trashOutline;
  checkmarkCircleIcon = checkmarkCircleOutline;
  clipboardIcon = clipboardOutline;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

  ionViewWillEnter(): void {
    this.loadTasks();
  }

  /* ===== CARGA DE TAREAS ===== */

  loadTasks(): void {
    let result = this.taskService.getTasksByStatus(
      'ASSIGNED',
      undefined,
      this.searchText
    );

    // FILTRO POR CATEGORÍA 
    if (this.activeCategoryFilters.length) {
      result = result.filter(task =>
        this.activeCategoryFilters.includes(task.category)
      );
    }

    //  ORDENAMIENTO
    result = result.sort((a, b) =>
      this.sortDirection === 'ASC'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

    this.tasks = result;
  }

  /*  BUSCADOR  */

  onSearchChange(value: string): void {
    this.searchText = value;
    this.loadTasks();
  }



  onSortChange(direction: 'ASC' | 'DESC'): void {
    this.sortDirection = direction;
    this.loadTasks();
  }

  /* FILTRO POR CATEGORÍA*/

  async openCategoryModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: CategoryFilterModalComponent,
      componentProps: {
        categories: this.categories,
        selected: [...this.activeCategoryFilters],
      },
     initialBreakpoint: 0.6, 
    breakpoints: [0, 0.6, 0.9], 
    handle: true, 
    });

    modal.onDidDismiss().then(({ data }) => {
      if (Array.isArray(data)) {
        this.activeCategoryFilters = data;
        this.loadTasks();
      }
    });

    await modal.present();
  }

  /*  ACCIONES  */

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
    this.modalCtrl
      .create({
        component: EditTaskModalComponent,
        componentProps: { task },
        initialBreakpoint: 0.4, 
    breakpoints: [0, 0.7, 0.95],
    handle: true
      })
      .then(modal => {
        modal.onDidDismiss().then(() => this.loadTasks());
        modal.present();
      });
  }
}