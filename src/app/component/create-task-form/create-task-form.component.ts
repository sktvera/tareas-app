import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { TaskCategory } from '../../models/task.model';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class TaskFormComponent implements OnInit {
  categories: TaskCategory[] = [];
  title: string = '';
  description: string = '';
  category: TaskCategory | null = null;

  @Output() create = new EventEmitter<{
    title: string;
    description: string;
    category: TaskCategory;
  }>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categories = this.categoryService.getCategories();
    if (this.categories.length > 0) {
      this.category = this.categories[0];
    }
  }

  // Getter para validar el formulario de forma limpia en el HTML
  get isFormValid(): boolean {
    return this.title.trim().length > 0 && this.category !== null;
  }

  submit(): void {
    if (this.isFormValid && this.category) {
      this.create.emit({
        title: this.title.trim(),
        description: this.description.trim(),
        category: this.category,
      });

      this.resetForm();
    }
  }

  private resetForm(): void {
    this.title = '';
    this.description = '';
    // Mantenemos la primera categoría seleccionada por defecto tras limpiar
    if (this.categories.length > 0) {
      this.category = this.categories[0];
    }
  }
}