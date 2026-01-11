import { Injectable } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private tasks: Task[] = [];
  private idCounter = 1;

  // Crear una nueva tarea
  create(data: { title: string; description?: string }) {
    const task: Task = {
      id: this.idCounter++,
      title: data.title,
      description: data.description,
      status: 'PENDING',
      createdAt: new Date(),
    };

    this.tasks.push(task);
  }

  // Todas las tareas activas (pendientes o en progreso)
  getMyTasks(): Task[] {
    return this.tasks.filter(
      task => task.status !== 'COMPLETED'
    );
  }

  // Tareas completadas
  getCompleted(): Task[] {
    return this.tasks.filter(
      task => task.status === 'COMPLETED'
    );
  }

  // Marcar tarea como iniciada
  startTask(id: number) {
    this.updateStatus(id, 'IN_PROGRESS');
  }

  // Marcar tarea como completada
  completeTask(id: number) {
    this.updateStatus(id, 'COMPLETED');
  }

  // Obtener todas (opcional / debug)
  getAll(): Task[] {
    return [...this.tasks];
  }

  // 🔒 Método privado para actualizar estado
  private updateStatus(id: number, status: TaskStatus) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = status;
    }
  }
}