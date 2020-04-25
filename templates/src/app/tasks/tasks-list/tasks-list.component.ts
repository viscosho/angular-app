import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tasks-list',
  template: `
    <h3>
      List of tasks
    </h3>
    <section *ngIf="tasks$ | async as tasks; else empty">
      <p>Current {{ tasks.length }} tasks...</p>
      <ul>
        <li *ngFor="let task of tasks">
          {{ task.description }} - {{ task.done ? 'Done' : 'Pending' }}
          <button (click)="onDoneClick(task)">✅</button>
          <button (click)="onDeleteClick(task)">🗑</button>
        </li>
      </ul>
    </section>
    <ng-template #empty>
      <p>No tasks yet...</p>
    </ng-template>
  `,
  styles: [],
})
export class TasksListComponent implements OnInit {
  tasks$ = this.service.get();
  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.service.refreshNeeded$.subscribe(() => this.getAllTasks());
  }
  private getAllTasks() {
    this.tasks$ = this.service.get();
  }
  onDoneClick(task) {
    task.done = !task.done;
    this.tasks$ = this.service.put(task);
  }
  onDeleteClick(task) {
    this.tasks$ = this.service.delete(task);
  }
}
