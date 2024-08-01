import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../service/task.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss',
})
export class TaskFilterComponent implements OnInit {
  faCoffee = faCoffee;
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filterStatus: string = 'all';

  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private apiService: TaskService) {}
  ngOnInit(): void {
    this.apiService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      // this.filterTasks();
    });
  }

  setFilter(status: string): void {
    this.filterChange.emit(status);
    this.filterStatus = status;
  }
  // filterTasks(): void {
  //   if (this.filterStatus === 'all') {
  //     this.filteredTasks = this.tasks;
  //   } else if (this.filterStatus === 'completed') {
  //     this.filteredTasks = this.tasks.filter((task) => task.completed);
  //   } else {
  //     this.filteredTasks = this.tasks.filter((task) => !task.completed);
  //   }
  // }
}
