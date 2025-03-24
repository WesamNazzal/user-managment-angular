import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-city-dropdown',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule],
  template: `
    <p-dropdown
      [options]="cities"
      [(ngModel)]="selectedCity"
      (onChange)="onChange($event.value)"
      (onBlur)="onTouched()"
      placeholder="Select a city"
      styleClass="city-dropdown"
    >
    </p-dropdown>
  `,
  styles: [
    `
      .city-dropdown {
        width: 100%;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CityDropdownComponent,
      multi: true,
    },
  ],
})
export class CityDropdownComponent implements ControlValueAccessor {
  @Input() cities: { label: string; value: string }[] = [];

  selectedCity: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.selectedCity = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
