import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, ToastModule],
  template: ` <p-toast key="global" position="top-right"></p-toast>`,
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {}
