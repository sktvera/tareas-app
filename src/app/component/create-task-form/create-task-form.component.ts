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
  title = '';
  description = '';
  category: TaskCategory | null = null;

  @Output() create = new EventEmitter<{
    title: string;
    description: string;
    category: TaskCategory;
  }>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    if (this.categories.length) {
      this.category = this.categories[0];
    }
  }

  submit(): void {
    if (!this.title.trim() || !this.category) return;

    this.create.emit({
      title: this.title,
      description: this.description,
      category: this.category,
    });

    this.resetForm();
  }

  private resetForm(): void {
    this.title = '';
    this.description = '';
    this.category = this.categories.length ? this.categories[0] : null;
  }
}