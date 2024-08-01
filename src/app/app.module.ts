import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'add-task', component: TaskFormComponent },
  // { path: '**', redirectTo: '' },
];
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CommonModule,
    RouterOutlet,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
