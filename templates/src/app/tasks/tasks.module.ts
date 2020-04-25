import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksNewComponent } from './tasks-new/tasks-new.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';

@NgModule({
  declarations: [TasksComponent, TasksNewComponent, TasksListComponent],
  imports: [CommonModule, TasksRoutingModule, FormsModule],
})
export class TasksModule {}
