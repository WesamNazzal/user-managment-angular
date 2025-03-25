import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { User } from '../../services/user.service';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  styleUrls: ['./user-table.component.scss'],
  template: `
    <p-table
      [value]="users"
      responsiveLayout="scroll"
      styleClass="p-datatable-striped"
    >
      <ng-template pTemplate="header">
        <tr>
          <th pSortableColumn="username">
            Username <p-sortIcon field="username"></p-sortIcon>
          </th>
          <th pSortableColumn="email">
            Email <p-sortIcon field="email"></p-sortIcon>
          </th>
          <th pSortableColumn="company.name">
            Company <p-sortIcon field="company.name"></p-sortIcon>
          </th>
          <th>Actions</th>
        </tr>
      </ng-template>

      <ng-template pTemplate="body" let-user>
        <tr>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.company?.name || 'N/A' }}</td>
          <td>
            <button
              pButton
              icon="pi pi-pencil"
              class="icon-btn"
              (click)="edit.emit(user.id)"
            ></button>
            <button
              pButton
              icon="pi pi-trash"
              class="icon-btn danger"
              (click)="delete.emit(user.id)"
            ></button>
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
})
export class UserTableComponent {
  @Input() users: User[] = [];
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
}
