import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tasks-new',
  template: `
    <h3>
      Create new task
    </h3>
    <form>
      <label>Task description: </label>
      <input [(ngModel)]="task.description" name="description" />
      <br />
      <button (click)="saveTask()">Save Task</button>
    </form>
  `,
  styles: [],
})
export class TasksNewComponent implements OnInit {
  task = {
    description: '',
    done: false,
  };
  constructor(private service: ApiService) {}

  ngOnInit(): void {}

  saveTask = () => this.service.post(this.task).subscribe();
}
