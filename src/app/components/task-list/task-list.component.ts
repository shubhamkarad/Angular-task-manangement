import { Component } from '@angular/core';
import { TaskFilterComponent } from '../task-filter/task-filter.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task } from '../../models/task';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Observable, Subscription } from 'rxjs';
import { TaskService } from '../../service/task.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    TaskFilterComponent,
    TaskFormComponent,
    TaskItemComponent,
    TaskFormComponent,
    RouterLink,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  tasks$: Observable<Task[]>;
  tasks: Task[] = [];
  subscription!: Subscription;
  filteredTasks: Task[] = this.tasks;
  currentFilter: { status: string; searchTerm: string } = {
    status: 'all',
    searchTerm: '',
  };

  constructor(private apiService: TaskService) {
    this.tasks$ = this.apiService.getTasks();
    this.subscription = this.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.filteredTasks = this.tasks;
    });
  }

  ngOnInit(): void {}

  onFilterChange(filter: { status: string; searchTerm: string }) {
    this.currentFilter = filter; // Update the current filter state
    this.applyFilter(filter);
  }
  // applyFilter(filter: string) {
  //   switch (filter) {
  //     case 'completed':
  //       this.filteredTasks = this.tasks.filter((task) => task.completed);
  //       break;
  //     case 'incomplete':
  //       this.filteredTasks = this.tasks.filter((task) => !task.completed);
  //       break;
  //     default:
  //       this.filteredTasks = this.tasks;
  //   }
  // }
  applyFilter(filter: { status: string; searchTerm: string }): void {
    this.currentFilter = filter;
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesStatus =
        filter.status === 'all' ||
        (filter.status === 'completed' && task.completed) ||
        (filter.status === 'incomplete' && !task.completed);

      const matchesSearchTerm =
        !filter.searchTerm ||
        task.title.toLowerCase().includes(filter.searchTerm.toLowerCase());

      return matchesStatus && matchesSearchTerm;
    });
  }

  deleteTask(id: string): void {
    this.apiService.deleteTask(id);
  }

  toggleTaskCompletion(id: string): void {
    this.apiService.toggleTaskCompletion(id).subscribe(() => {
      this.applyFilter(this.currentFilter); // Apply the filter after toggling task completion
    });
  }
}
