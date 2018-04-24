import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddUserComponent } from './user/add-user/add-user.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { ViewTaskComponent } from './task/view-task/view-task.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/adduser', pathMatch: 'full' },
  { path: 'adduser', component: AddUserComponent },
  { path: 'addproject', component: AddProjectComponent },
  { path: 'addtask', component: AddTaskComponent },
  { path: 'viewtask', component: ViewTaskComponent },
  { path: 'edittask', component: AddTaskComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}