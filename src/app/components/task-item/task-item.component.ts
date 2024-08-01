import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() toggle: EventEmitter<number> = new EventEmitter<number>();

  deleteTask(): void {
    this.delete.emit(this.task.id);
  }

  toggleCompletion(): void {
    this.toggle.emit(this.task.id);
  }
}
