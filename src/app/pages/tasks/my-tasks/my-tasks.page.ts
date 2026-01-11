import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../service/task.service';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.page.html',
  styleUrls: ['./my-tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class MyTasksPage {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ionViewWillEnter() {
    this.tasks = this.taskService.getMyTasks();
  }

  completeTask(id: number) {
    this.taskService.completeTask(id);
    this.tasks = this.taskService.getMyTasks();
  }
}