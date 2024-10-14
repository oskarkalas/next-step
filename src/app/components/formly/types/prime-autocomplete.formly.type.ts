import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'formly-primeng-autocomplete',
  template: `
    <p-autoComplete
      [inputId]="key"
      [(ngModel)]="props.selelectedItem"
      [minLength]="props.minLength"
      [delay]="props.delay || 300"
      [style]="props.style"
      [panelStyle]="props.panelStyle"
      [styleClass]="props.styleClass"
      [panelStyleClass]="props.panelStyleClass"
      [inputStyleClass]="props.inputStyleClass"
      [suggestions]="props.suggestions"
      [dropdown]="props.dropdown || false"
      [optionLabel]="props?.name"
      [placeholder]="props.placeholder || ''"
      [forceSelection]="props.forceSelection || false"
      [virtualScroll]="props.virtualScroll || false"
      [scrollHeight]="props.scrollHeight"
      [multiple]="props.multiple || false"
      [readonly]="props.readonly || false"
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
