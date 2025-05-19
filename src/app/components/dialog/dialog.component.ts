import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ConfirmService } from '../../services/confirm.service';
import { ConfirmDialogData } from '../../models/confirm-dialog-data';
import { Task } from '../../Task';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();

  constructor(private confirmService: ConfirmService,
  @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
) {}

  onDelete(): void {
    this.onDeleteTask.emit(this.task);
  }

  openDialog() {
    this.confirmService.confirmDialog({
      title: 'Delete task',
      message: 'Are you sure to delete this task?',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });
  }

}
