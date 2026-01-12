import { Injectable } from '@angular/core';
import { Task, TaskStatus, TaskCategory } from '../models/task.model';
import { NotificationService } from '../service/notification'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private tasks: Task[] = [];
  private idCounter = 1;

  constructor(private notification: NotificationService) {}

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
    // Notificación morada de éxito
    this.notification.show('¡Tarea creada con éxito!', 'success', 'sparkles-outline');
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
      this.notification.show('Cambios guardados correctamente', 'success', 'save-outline');
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
    this.notification.show('Tarea asignada', 'info', 'person-outline');
  }

  completeTask(id: number): void {
    this.updateStatus(id, 'COMPLETED');
    this.notification.show('¡Tarea completada! Buen trabajo', 'success', 'checkmark-done-circle-outline');
  }

  returnToPending(id: number): void {
    this.updateStatus(id, 'PENDING');
    this.notification.show('Tarea devuelta a pendientes', 'info', 'arrow-back-circle-outline');
  }

  /** 🔥 NUEVO: COMPLETED → ASSIGNED */
  returnToAssigned(id: number): void {
    this.updateStatus(id, 'ASSIGNED');
    this.notification.show('Tarea movida a asignadas', 'info', 'people-outline');
  }

  deleteTask(id: number): void {
    const taskTitle = this.tasks.find(t => t.id === id)?.title;
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.notification.show(`Eliminado: ${taskTitle}`, 'error', 'trash-outline');
  }

  private updateStatus(id: number, status: TaskStatus): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = status;
    }
  }
}