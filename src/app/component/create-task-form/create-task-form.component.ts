import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  IonCard,
  IonCardContent,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

import { TaskCategory } from '../../models/task.model';
import { CategoryService } from '../../service/category.service';

import {
  sparklesOutline,
  addCircleOutline,
  lockClosedOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardContent,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    FormsModule,
    CommonModule
  ],
})
export class TaskFormComponent implements OnInit {

  sparklesIcon = sparklesOutline;
  addCircleIcon = addCircleOutline;
  lockClosedIcon = lockClosedOutline;

  @Input() categories: TaskCategory[] = [];
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
    // Si no se pasan categorías como input, cargarlas del servicio
    if (this.categories.length === 0) {
      this.categories = this.categoryService.getCategories();
    }
    if (this.categories.length > 0) {
      this.category = this.categories[0];
    }
  }


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