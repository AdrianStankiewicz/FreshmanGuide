import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FilterHandlerService {
  private filtersForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  private buildForm(): void {
    this.filtersForm = this.fb.nonNullable.group({
      building: new FormControl<string>(''),
      floor: new FormControl<string>(''),
      room: new FormControl<string>(''),
    });
  }

  getFiltersForm(): FormGroup {
    return this.filtersForm;
  }
}
