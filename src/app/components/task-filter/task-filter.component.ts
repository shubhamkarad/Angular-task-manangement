import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  NgModule,
} from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../service/task.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss',
})
export class TaskFilterComponent implements OnInit {
  faCoffee = faCoffee;
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filterStatus: string = 'all';
  searchTerm: string = '';
  @Output() filterChange: EventEmitter<{ status: string; searchTerm: string }> =
    new EventEmitter<{ status: string; searchTerm: string }>();

  constructor(private apiService: TaskService) {}
  ngOnInit(): void {
    this.apiService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      // this.filterTasks();
    });
  }

  setFilter(status: string): void {
    this.filterChange.emit({
      status: status,
      searchTerm: this.searchTerm,
    });
    this.filterStatus = status;
  }
  onSearchTermChange(): void {
    this.emitFilterChange();
  }

  private emitFilterChange(): void {
    this.filterChange.emit({
      status: this.filterStatus,
      searchTerm: this.searchTerm,
    });
  }
}
