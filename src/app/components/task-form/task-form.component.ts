import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task';
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode: boolean = false;
  taskId?: string;
  constructor(
    private fb: FormBuilder,
    private apiService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.taskId = params.get('id') ?? undefined;
      if (this.taskId) {
        this.isEditMode = true;
        this.apiService.getTaskById(this.taskId).subscribe((task) => {
          this.taskForm.patchValue({
            title: task.title,
            description: task.description,
          });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const { title, description } = this.taskForm.value;
      if (this.isEditMode && this.taskId) {
        const updatedTask: Task = {
          id: this.taskId,
          title,
          description,
          completed: false,
        };
        this.apiService.updateTask(updatedTask).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.apiService.addTask({
          id: uuidv4(),
          title,
          description,
          completed: false,
        });
        this.taskForm.reset();
        this.router.navigate(['/']);
      }
    }
  }
  onCancel(): void {
    this.router.navigate(['/']);
  }
}
