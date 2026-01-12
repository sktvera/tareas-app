import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskService } from '../../../service/task.service';
import { Task, TaskCategory } from '../../../models/task.model';
import { CategoryService } from '../../../service/category.service';


import { AppHeaderComponent } from '../../../component/app-header/app-header.component';
import { TaskToolbarComponent } from '../../../component/task-toolbar/task-toolbar.component';
import { CategoryFilterModalComponent } from '../../../component/category-filter-modal/category-filter-modal.component';


@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.page.html',
  styleUrls: ['./completed-tasks.page.scss','../../../shared/scss/tasks.shared.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppHeaderComponent,
    TaskToolbarComponent,
  ],
})
export class CompletedTasksPage implements OnInit {

  tasks: Task[] = [];
  categories: TaskCategory[] = [];
  activeCategoryFilters: TaskCategory[] = []; // ✅ array de filtros
  searchText = '';
  sortDirection: 'ASC' | 'DESC' = 'ASC';

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController,
    private categoryService: CategoryService,

  ) {}
  ngOnInit(): void {
 this.categories = this.categoryService.getCategories();
  }

  ionViewWillEnter(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    let result = this.taskService.getTasksByStatus('COMPLETED', undefined, this.searchText);

    // Filtrar por categorías seleccionadas
    if (this.activeCategoryFilters.length) {
      result = result.filter(task =>
        this.activeCategoryFilters.includes(task.category)
      );
    }

    // Ordenar
    this.tasks = result.sort((a, b) =>
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
      componentProps: {
        categories: this.categories,
        selected: [...this.activeCategoryFilters],
      },
     initialBreakpoint: 0.6, // Ahora se abrirá ocupando el 60% de la pantalla
    breakpoints: [0, 0.6, 0.9], // Permite bajarla, dejarla al 60% o subirla casi al máximo
    handle: true, // Muestra la barrita para que el usuario sepa que puede arrastrarla
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        this.activeCategoryFilters = data;
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