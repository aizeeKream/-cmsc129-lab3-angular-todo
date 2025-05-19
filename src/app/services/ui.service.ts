import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTask: boolean = false;
  private isEdit: boolean = false;

  private showAddTaskSubject = new Subject<boolean>();
  private editTaskSubject = new Subject<boolean>();

  constructor() {}

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.showAddTaskSubject.next(this.showAddTask);
  }

  toggleEditTask(): void {
    this.isEdit = !this.isEdit;
    this.editTaskSubject.next(this.isEdit);
  }

  onToggleAddTask(): Observable<boolean> {
    return this.showAddTaskSubject.asObservable();
  }

  onToggleEditTask(): Observable<boolean> {
    return this.editTaskSubject.asObservable();
  }
}



