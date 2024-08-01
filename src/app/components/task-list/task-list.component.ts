import { Component } from '@angular/core';
import { TaskFilterComponent } from '../task-filter/task-filter.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task } from '../../models/task';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Observable, Subscription } from 'rxjs';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskFilterComponent, TaskFormComponent, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  // tasks: Task[] = [
  //   {
  //     id: 1,
  //     title: 'Sample Task 1',
  //     description: 'This is a sample task',
  //     completed: false,
  //   },
  //   {
  //     id: 2,
  //     title: 'Sample Task 2',
  //     description: 'Another sample task',
  //     completed: true,
  //   },
  // ];
  tasks$: Observable<Task[]>;
  tasks: Task[] = [];
  subscription!: Subscription;

  constructor(private apiService: TaskService) {
    this.tasks$ = this.apiService.getTasks();
    this.subscription = this.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnInit(): void {}

  deleteTask(id: number): void {
    this.apiService.deleteTask(id);
  }

  toggleTaskCompletion(id: number): void {
    this.apiService.toggleTaskCompletion(id);
  }
}
