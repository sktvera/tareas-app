import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, TaskCategory } from '../../models/task.model';
import { TaskService } from '../../service/task.service';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './edit-task-modal.component.html',
})
export class EditTaskModalComponent {

  @Input() task!: Task;

  title = '';
  description = '';
  category!: TaskCategory;

  categories: TaskCategory[] = [
    'PERSONAL',
    'TRABAJO',
    'ESTUDIO',
    'OTROS',
  ];

  constructor(
    private modalController: ModalController,
    private taskService: TaskService
  ) {}

  ionViewWillEnter(): void {
    this.title = this.task.title;
    this.description = this.task.description;
    this.category = this.task.category;
  }

  save(): void {
    this.taskService.updateTask(
      this.task.id,
      this.title,
      this.description,
      this.category
    );
    this.modalController.dismiss(true);
  }

  close(): void {
    this.modalController.dismiss(false);
  }
}