import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, ToastModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  visible = false;

  @Output() confirmed = new EventEmitter<void>();

  constructor(private toastService: ToastService) {}

  show() {
    this.visible = true;
  }

  confirm() {
    this.confirmed.emit();
    this.visible = false;

    this.toastService.show(
      'success',
      'User Deleted',
      'User has been deleted successfully!'
    );
  }

  cancel() {
    this.visible = false;
  }
}
