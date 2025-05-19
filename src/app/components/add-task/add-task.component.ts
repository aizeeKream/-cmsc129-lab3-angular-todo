//https://pythonguides.com/typescript-get-current-date/
//https://www.npmjs.com/package/uuid
//https://www.webdevtutor.net/blog/typescript-get-random-id

import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { format, startOfDay } from 'date-fns';
import { Task } from '../../Task';
import { v4 as uuidv4 } from 'uuid';
import { UiService } from '../../services/ui.service';
import {Subscription} from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {NgxMaterialTimepickerModule, NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';


@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule,MatInputModule, MatFormFieldModule, MatNativeDateModule, MatDatepickerModule,NgxMaterialTimepickerModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
              customTheme: NgxMaterialTimepickerTheme = {
              container: {
                  bodyBackgroundColor: '#424242',
                  buttonColor: '#fff'
              },
              dial: {
                  dialBackgroundColor: '#555',
              },
              clockFace: {
                  clockFaceBackgroundColor: '#555',
                  clockHandColor: '#9fbd90',
                  clockFaceTimeInactiveColor: '#fff'
              }

          };
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  currentDate: Date = new Date();
  randomUuid = uuidv4();

  id!: string;
  text!: string;
  dueDate!: string;
  dateAdded: string = format(this.currentDate, 'MMMM d, yyyy');
  time!: string;
  priority: string = "";
  isCompleted: boolean = false;
  showAddTask!: boolean;
  subscription!: Subscription;




  constructor(private uiService: UiService){
      this.subscription = this.uiService.onToggleAddTask().subscribe((value) => {
      this.showAddTask = value;
  });
    console.log(this.dateAdded);
    console.log(this.id);
  }

  onSubmit() {
    if(!this.text ||
      !this.dueDate ||
      !this.priority ||
      !this.time
    ) {
      alert('Please complete a task');

      return;
    }
    const parseDueDate = format(Date.parse(this.dueDate), 'MMMM d, yyyy');
    const newTask = {
      id: uuidv4(),
      text: this.text,
      dueDate: parseDueDate,
      dateAdded: this.dateAdded,
      time: this.time,
      priority: this.priority,
      isCompleted: this.isCompleted
    };

    this.onAddTask.emit(newTask);
    this.id;
    this.text = '';
    this.dueDate = '';
    this.dateAdded;
    this.time = '';
    this.priority = '';
    this.isCompleted = false;
  }

}
