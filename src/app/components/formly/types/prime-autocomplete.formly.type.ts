import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'formly-primeng-autocomplete',
  template: `
    <p-autoComplete
      id="{{key}}"
      [(ngModel)]="props.selelectedItem"
      [suggestions]="props.suggestions"
      [dropdown]="props.dropdown || false"
      [optionLabel]="props?.name"
      [placeholder]="props.placeholder || ''"
      [forceSelection]="props.forceSelection || false"
      [virtualScroll]="props.virtualScroll || false"
      [multiple]="props.multiple || false"
      [disabled]="props.disabled || false"
      [showClear]="props.showClear || false"
      (completeMethod)="props?.complete($event)" />
  `,
  imports: [
    ReactiveFormsModule,
    AutoCompleteModule,
    FormsModule
  ],
  standalone: true
})
export class PrimeAutocompleteFormlyType extends FieldType<FieldTypeConfig> {

}
