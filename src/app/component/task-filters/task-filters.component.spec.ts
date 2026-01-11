import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFilterionicPage } from './task-filters.component';

describe('TaskFilterionicPage', () => {
  let component: TaskFilterionicPage;
  let fixture: ComponentFixture<TaskFilterionicPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFilterionicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
