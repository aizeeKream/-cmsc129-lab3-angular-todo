//https://www.youtube.com/watch?v=xpXlEJArHzg&t=2s
//https://stackoverflow.com/questions/71732087/sort-array-by-date-newest-first-in-angular
//https://stackoverflow.com/questions/65401582/use-sort-to-sort-by-preference
//https://peerdh.com/blogs/programming-insights/implementing-a-priority-system-for-todo-list-items-in-javascript-1
//https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b/57088282#57088282


import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';
import { TaskItemComponent } from "../task-item/task-item.component";
import { AddTaskComponent } from "../add-task/add-task.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { UiService } from '../../services/ui.service';
import {Subscription} from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {NgxMaterialTimepickerModule, NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';
import { format, startOfDay } from 'date-fns';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskItemComponent, FormsModule, MatInputModule, MatFormFieldModule, MatNativeDateModule, MatDatepickerModule, NgxMaterialTimepickerModule, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css', '/src/styles.css',

  ]

})
export class TasksComponent implements OnInit {
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
  tasks: Task[] = [];
  deletedTask: Task | null = null;

  isEdit: boolean = false;
  taskToEdit: Task | null = null;

  text: string = '';
  dueDate: string = '';
  time: string = '';
  priority: string = '';
  sort: string = 'dateAdded';
  subscription!: Subscription;
  showAddTask!: boolean;
  isCompleted!: boolean;
completed: any;

     constructor(private taskService: TaskService, private snackBar: MatSnackBar,private uiService: UiService) {
      this.subscription = this.uiService.onToggleEditTask().subscribe((value) => {
      this.isEdit = value;
    });
    }


  ngOnInit(): void {
     this.taskService.getTasks().subscribe((tasks) => {
    this.tasks = tasks;
    this.sortBy();
  });

  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
      this.deletedTask = task;

      let snackBarRef = this.snackBar.open('Task deleted', 'Undo',  { duration: 5000, verticalPosition: 'top', panelClass: ['toast']} );
      snackBarRef.onAction().subscribe(() => {
        if (this.deletedTask) {
          this.taskService.addTask(this.deletedTask).subscribe((task) => {
            this.tasks.push(task);
            this.deletedTask = null;
            this.sortBy();
          });
        }

      });
    });

  }

  addTask(task: Task): void {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));

  }


  editTask(task: Task): void {
      if (this.isEdit && this.taskToEdit?.id === task.id) {
      this.isEdit = false;
      this.taskToEdit = null;
      this.text = '';
      this.dueDate = '';
      this.time = '';
      this.priority = '';
      this.uiService.toggleEditTask();
    } else if(!this.isEdit){
      this.isEdit = true;
      this.taskToEdit = task;
      this.text = task.text;
      this.dueDate = task.dueDate;
      this.time = task.time;
      this.priority = task.priority;
      this.uiService.toggleEditTask();
    }
    }

    onSubmitEdit(): void {
      if (!this.taskToEdit
      ) return;

      const parseDueDate = format(Date.parse(this.dueDate), 'MMMM d, yyyy');
      const updatedTask: Task = {
        ...this.taskToEdit,
        text: this.text,
        dueDate: parseDueDate,
        time: this.time,
        priority: this.priority
      };

      this.taskService.editTask(updatedTask).subscribe((task) => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          this.tasks[index] = task;
        }
        this.isEdit = false;
        this.taskToEdit = null;
        this.text = '';
        this.dueDate = '';
        this.time = '';
        this.priority = '';
      });


    }

  sortBy(){
    if(this.sort == 'dateAdded'){
      this.tasks.sort((a,b)=>{
        const dt1 = Date.parse(a.dateAdded);
        const dt2 = Date.parse(b.dateAdded);

        if (dt1 > dt2) return 1;
        if (dt1 < dt2) return -1;
        return 0;
      })
    }
    else if(this.sort == 'dueDate'){
      this.tasks.sort((a,b)=>{
        const dt1 = Date.parse(a.dueDate);
        const dt2 = Date.parse(b.dueDate);

        if (dt1 > dt2) return 1;
        if (dt1 < dt2) return -1;
        return 0;
      })
    }
    else if(this.sort == 'priority'){
        const priorityOrder = {High: 0, Mid: 1, Low: 2};
        this.tasks.sort((a, b) => priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder]);
    }

  }

}
