import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3200/tasks';

  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    []
  );
  private tasks$: Observable<Task[]> = this.tasksSubject.asObservable();
  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.http.get<Task[]>(this.apiUrl).subscribe((tasks) => {
      this.tasksSubject.next(tasks);
    });
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  addTask(task: Task): void {
    this.http.post<Task>(this.apiUrl, task).subscribe((newTask) => {
      const tasks = this.tasksSubject.value;
      this.tasksSubject.next([...tasks, newTask]);
    });
  }

  updateTask(updatedTask: Task): void {
    this.http
      .put<Task>(`${this.apiUrl}/${updatedTask.id}`, updatedTask)
      .subscribe((task) => {
        const tasks = this.tasksSubject.value.map((t) =>
          t.id === task.id ? task : t
        );
        this.tasksSubject.next(tasks);
      });
  }

  deleteTask(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      const tasks = this.tasksSubject.value.filter((t) => t.id !== id);
      this.tasksSubject.next(tasks);
    });
  }

  toggleTaskCompletion(id: number): void {
    const tasks = this.tasksSubject.value.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    const updatedTask = tasks.find((task) => task.id === id);
    if (updatedTask) {
      this.updateTask(updatedTask);
    }
  }
}
