import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  template: `
    <h2>
      My tasks manager
    </h2>
    <app-tasks-new></app-tasks-new>
    <app-tasks-list></app-tasks-list>
  `,
  styles: [],
})
export class TasksComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
