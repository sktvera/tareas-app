import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskCategory } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  // Lista de categorías mock
  private categories: TaskCategory[] = [
    'PERSONAL',
    'TRABAJO',
    'ESTUDIO',
    'OTROS',
  ];

  // Observable para que otros componentes puedan subscribirse
  private categoriesSubject = new BehaviorSubject<TaskCategory[]>(this.categories);
  categories$: Observable<TaskCategory[]> = this.categoriesSubject.asObservable();

  constructor() {}

  getCategories(): TaskCategory[] {
    return [...this.categories]; // retornamos copia
  }

  addCategory(category: TaskCategory): void {
    if (!this.categories.includes(category)) {
      this.categories.push(category);
      this.categoriesSubject.next([...this.categories]); // emitimos actualización
    }
  }
}