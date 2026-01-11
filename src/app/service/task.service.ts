import { Injectable } from '@angular/core';
import { Task, TaskStatus, TaskCategory } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private tasks: Task[] = [];
  private idCounter = 1;

  createTask(
    title: string,
    description: string,
    category: TaskCategory
  ): void {
    this.tasks.push({
      id: this.idCounter++,
      title,
      description,
      category,
      status: 'PENDING',
      createdAt: new Date(),
    });
  }

  updateTask(
    id: number,
    title: string,
    description: string,
    category: TaskCategory
  ): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.title = title;
      task.description = description;
      task.category = category;
    }
  }

  getTasksByStatus(
    status: TaskStatus,
    category?: TaskCategory,
    search?: string
  ): Task[] {
    return this.tasks.filter(task => {
      const matchesStatus = task.status === status;
      const matchesCategory = !category || task.category === category;
      const matchesSearch =
        !search ||
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }

  assignTask(id: number): void {
    this.updateStatus(id, 'ASSIGNED');
  }

  completeTask(id: number): void {
    this.updateStatus(id, 'COMPLETED');
  }

  returnToPending(id: number): void {
    this.updateStatus(id, 'PENDING');
  }

  /** 🔥 NUEVO: COMPLETED → ASSIGNED */
  returnToAssigned(id: number): void {
    this.updateStatus(id, 'ASSIGNED');
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  private updateStatus(id: number, status: TaskStatus): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = status;
    }
  }
}