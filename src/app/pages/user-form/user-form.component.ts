import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CityDropdownComponent } from '../../shared/city-dropdown/city-dropdown.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ToastComponent } from '../../shared/toast/toast.componant';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    ToastComponent,
    CityDropdownComponent,
    NavbarComponent,
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  cityControl: FormControl = new FormControl('', Validators.required);

  cities = [
    { label: 'New York', value: 'New York' },
    { label: 'Los Angeles', value: 'Los Angeles' },
    { label: 'Chicago', value: 'Chicago' },
    { label: 'Houston', value: 'Houston' },
    { label: 'Miami', value: 'Miami' },
    { label: 'Seattle', value: 'Seattle' },
    { label: 'Dallas', value: 'Dallas' },
    { label: 'San Francisco', value: 'San Francisco' },
    { label: 'Boston', value: 'Boston' },
    { label: 'Denver', value: 'Denver' },
  ];

  isEdit = false;
  userId?: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9-]+$/),
      ]),
      website: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(https?:\/\/)?([\w\d\-_]+)\.([a-z]{2,})(\/[\w\d\-_.~]*)*$/
        ),
      ]),
      street: new FormControl('', [Validators.required]),
      suite: new FormControl('',[Validators.required]),
      zipcode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{5}-\d{4}|\d{5}$/),
      ]),
      companyName: new FormControl('', [Validators.required]),
      catchPhrase: new FormControl('', [Validators.required]),
      bs: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required])

    });
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];

    if (this.userId) {
      this.isEdit = true;
      this.userService.getUser(this.userId).subscribe((user) => {
        if (user) {
          this.userForm.patchValue({
            ...user,
            street: user.address?.street || '',
            suite: user.address?.suite || '',
            zipcode: user.address?.zipcode || '',
            companyName: user.company?.name || '',
            catchPhrase: user.company?.catchPhrase || '',
            bs: user.company?.bs || '',
          });

          this.cityControl.setValue(user.address?.city || '');
        }
      });
    }

    this.cityControl.valueChanges.subscribe((city) => {
      this.userForm.patchValue({ city });
    });
  }

  saveUser() {
    if (this.userForm.invalid || !this.cityControl.value) {
      this.userForm.markAllAsTouched();
      return;
    }

    const user: User = {
      ...this.userForm.value,
      address: {
        street: this.userForm.value.street,
        suite: this.userForm.value.suite,
        city: this.cityControl.value,
        zipcode: this.userForm.value.zipcode,
      },
      company: {
        name: this.userForm.value.companyName,
        catchPhrase: this.userForm.value.catchPhrase,
        bs: this.userForm.value.bs,
      },
    };

    if (this.isEdit) {
      user.id = this.userId;
      this.userService.updateUser(user).subscribe(() => {
        this.toastService.show(
          'success',
          'User Updated',
          'The user was updated successfully.'
        );
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.addUser(user).subscribe(() => {
        this.toastService.show(
          'success',
          'User Created',
          'The user was added successfully.'
        );
        this.router.navigate(['/users']);
      });
    }
  }
}
