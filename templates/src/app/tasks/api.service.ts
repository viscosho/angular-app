import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = 'https://api-base.herokuapp.com/api/pub/tasks';
  private change$ = new Subject<void>();

  refreshNeeded$ = this.change$.asObservable();

  constructor(private http: HttpClient) {}

  get = () => this.http.get(this.url);

  post = task => this.http.post(this.url, task).pipe(tap(this.emitChange));

  put = task => this.http.put(this.getTaskUrl(task), task).pipe(tap(this.emitChange));

  delete = task => this.http.delete(this.getTaskUrl(task)).pipe(tap(this.emitChange));

  private emitChange = () => this.change$.next();

  private getTaskUrl = task => `${this.url}/${task._id}`;
}
