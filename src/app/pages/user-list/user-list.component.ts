import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MenuModule, Menu } from 'primeng/menu';
import { MenuItem, MessageService } from 'primeng/api';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ToastModule } from 'primeng/toast';
import { ToastComponent } from '../../shared/toast/toast.componant';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    MenuModule,
    ConfirmDialogComponent,
    ToastModule,
    ToastComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [MessageService],
})
export class UserListComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  loading: boolean = true;
  menuItems: MenuItem[] = [];
  selectedUserId: number | null = null;

  @ViewChild('menu') menu!: Menu;
  @ViewChild(ConfirmDialogComponent) confirmDialog!: ConfirmDialogComponent;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastservice: ToastService
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.loading = false;
    });
  }

  ngAfterViewInit() {
    if (!this.confirmDialog) {
      console.error('ConfirmDialogComponent not initialized');
    }
  }

  addUser() {
    this.router.navigate(['/users/add']);
  }

  getActions(userId: number): MenuItem[] {
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.editUser(userId),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.confirmDelete(userId),
      },
    ];
  }

  editUser(id: number) {
    this.router.navigate(['/users/edit', id]);
  }

  confirmDelete(userId: number) {
    this.selectedUserId = userId;
    this.confirmDialog.show();
  }

  deleteUser() {
    if (this.selectedUserId !== null) {
      this.users = this.users.filter((user) => user.id !== this.selectedUserId);
      this.selectedUserId = null;
    }
  }

  openMenu(event: Event, userId: number) {
    this.selectedUserId = userId;
    this.menuItems = this.getActions(userId);
    this.menu.toggle(event);
  }
}
