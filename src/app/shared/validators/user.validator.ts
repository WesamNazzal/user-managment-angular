import { FormGroup, FormControl, Validators } from '@angular/forms';

export function createUserForm(): FormGroup {
  return new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[0-9-]+$/)],
    }),
    website: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(
          /^(https?:\/\/)?([\w\d\-_]+)\.([a-z]{2,})(\/[\w\d\-_.~]*)*$/
        ),
      ],
    }),
    street: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    suite: new FormControl('', { nonNullable: true }),
    city: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    zipcode: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^\d{5}-\d{4}|\d{5}$/),
      ],
    }),
    companyName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    catchPhrase: new FormControl('', { nonNullable: true }),
    bs: new FormControl('', { nonNullable: true }),
  });
}
