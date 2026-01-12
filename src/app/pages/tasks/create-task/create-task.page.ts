import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, IonItemSliding } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TaskService } from '../../../service/task.service';
import { CategoryService } from '../../../service/category.service';
import { Task, TaskCategory } from '../../../models/task.model';

import { TaskFormComponent } from '../../../component/create-task-form/create-task-form.component';
import { CategoryFilterModalComponent } from '../../../component/category-filter-modal/category-filter-modal.component';
import { AppHeaderComponent } from '../../../component/app-header/app-header.component';
import { TaskToolbarComponent } from '../../../component/task-toolbar/task-toolbar.component';



@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss','../../../shared/scss/tasks.shared.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TaskFormComponent,
    AppHeaderComponent,
    TaskToolbarComponent
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateTaskPage implements OnInit {

  tasks: Task[] = [];
  categories: TaskCategory[] = [];

  searchText = '';
  searchActive = false;
  showCreateForm = false;

  activeCategoryFilters: TaskCategory[] = [];

  // 🔥 ORDENAMIENTO


  sortDirection: 'ASC' | 'DESC' = 'ASC';

activeCategory?: TaskCategory;

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


  
  /* ===== TAREAS ===== */

  createTask(event: {
    title: string;
    description: string;
    category: TaskCategory;
  }): void {
    this.taskService.createTask(
      event.title,
      event.description,
      event.category
    );
    this.loadTasks();
  }

assignTask(id: number, sliding?: IonItemSliding): void {
  this.taskService.assignTask(id);
  sliding?.close(); // 👈 cierre suave del swipe
  this.loadTasks();
}

  loadTasks(): void {
    let result = this.taskService.getTasksByStatus(
      'PENDING',
      undefined,
      this.searchText
    );

    // Filtro por categoría
    if (this.activeCategoryFilters.length) {
      result = result.filter(task =>
        this.activeCategoryFilters.includes(task.category)
      );
    }

    // 🔥 Ordenamiento por nombre
    result = result.sort((a, b) => {
      const nameA = a.title.toLowerCase();
      const nameB = b.title.toLowerCase();

      return this.sortDirection === 'ASC'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

    this.tasks = result;
  }

  /* ===== BUSCADOR ===== */

  toggleSearch(): void {
    this.searchActive = !this.searchActive;
    if (!this.searchActive) {
      this.searchText = '';
      this.loadTasks();
    }
  }

  onSearchChange(value: string): void {
    this.searchText = value;
    this.loadTasks();
  }

  /* ===== FORM ===== */

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
  }

  /* ===== FILTROS ===== */

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

  /* ===== ORDEN ===== */

  toggleSorting(): void {
    this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
    this.loadTasks();
  }

  onSortChange(direction: 'ASC' | 'DESC'): void {
  this.sortDirection = direction;
  this.loadTasks();
}
}