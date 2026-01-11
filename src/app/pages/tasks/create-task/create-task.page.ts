import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../service/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class CreateTaskPage {
  title = '';
  description = '';

  constructor(private taskService: TaskService) {}

  createTask() {
    if (!this.title.trim()) return;

    this.taskService.create({
      title: this.title,
      description: this.description,
    });

    this.title = '';
    this.description = '';
  }
}