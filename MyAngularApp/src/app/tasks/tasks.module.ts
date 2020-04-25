import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { TasksNewComponent } from './tasks-new/tasks-new.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

@NgModule({
  declarations: [TasksComponent, TasksNewComponent, TasksListComponent],
  imports: [CommonModule, TasksRoutingModule],
})
export class TasksModule {}
