import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TaskCategory } from '../../models/task.model';

@Component({
  standalone: true,
  selector: 'app-category-filter-modal',
  imports: [IonicModule, CommonModule],
  templateUrl: './category-filter-modal.component.html',
  styleUrls: ['./category-filter-modal.component.scss'],
})
export class CategoryFilterModalComponent {
  @Input() categories: TaskCategory[] = [];
  @Input() selected: TaskCategory[] = [];

  constructor(private modalCtrl: ModalController) {}

  toggle(category: TaskCategory) {
    this.selected.includes(category)
      ? this.selected = this.selected.filter(c => c !== category)
      : this.selected.push(category);
  }

  isSelected(category: TaskCategory): boolean {
    return this.selected.includes(category);
  }

  apply() {
    this.modalCtrl.dismiss(this.selected);
  }

  clear() {
    this.modalCtrl.dismiss([]);
  }
}