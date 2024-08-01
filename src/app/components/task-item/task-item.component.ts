import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() toggle: EventEmitter<string> = new EventEmitter<string>();

  deleteTask(): void {
    this.delete.emit(this.task.id);
  }

  toggleCompletion(): void {
    this.toggle.emit(this.task.id);
  }
}
