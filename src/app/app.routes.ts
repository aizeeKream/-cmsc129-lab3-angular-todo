import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { Component } from '@angular/core';
import { AddTaskComponent } from './components/add-task/add-task.component';


export const appRoutes: Routes = [{path: '', component: TasksComponent}


];
RouterModule.forRoot(appRoutes, {
  enableTracing: true
})



