import {Component, Input} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {FieldType, FieldTypeConfig} from '@ngx-formly/core';

@Component({
  selector: 'formly-primeng-input-text',
  template: `
    <input [formControl]="formControl"
           [type]="props.type || 'text'"
           [id]="key"
           [style.width]="width"
           [placeholder]="props.placeholder"
           pInputText >
  `,
  imports: [
    InputTextModule,
    ReactiveFormsModule
  ],
  standalone: true
})
export class PrimeInputType extends FieldType<FieldTypeConfig> {
  @Input() width: string = '100%';
}
