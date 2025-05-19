import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmService } from '../../services/confirm.service';
import { ConfirmDialogData } from '../../models/confirm-dialog-data';
import { UiService } from '../../services/ui.service';
import {Subscription} from 'rxjs';
import {Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-task-item',
  standalone: true,
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  imports: [MatIconModule, HttpClientModule],

})
export class TaskItemComponent {
  @Input() task: any;
  @Output() onDeleteTask = new EventEmitter<any>();
  @Output() onEditTask = new EventEmitter<any>();
  isEdit: boolean = false;
  subscription!: Subscription;

  constructor(private confirmService: ConfirmService, private uiService:UiService,
    private router:Router) {
    this.subscription = this.uiService.onToggleEditTask().subscribe((value) => {
    this.isEdit = value;
  });
  }


  toggleEditTask() {
      this.uiService.toggleEditTask();
  }

  openDialog(): void {
    const dialogData: ConfirmDialogData = {
      title: 'Delete task',
      message: 'Are you sure to delete this task?',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    };

    this.confirmService.confirmDialog(dialogData).subscribe(result => {
      if (result) {
        this.onDelete();
      }
    });
  }

  hasRoute(route: string){
    return this.router.url == route;
  }

  onDelete(): void {
    this.onDeleteTask.emit(this.task);
  }

  onEdit(): void{
    this.onEditTask.emit(this.task);
  }
}


