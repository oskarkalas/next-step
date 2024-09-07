import {Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {FieldType, FieldTypeConfig} from '@ngx-formly/core';
import {CheckboxModule} from "primeng/checkbox";

@Component({
  selector: 'formly-primeng-input-text',
  template: `
      <p-checkbox
        [id]="key"
        [binary]="true"
        [formControl]="formControl"></p-checkbox>
      <label [for]="key">{{props.label}}</label>
  `,
  imports: [
    ReactiveFormsModule,
    CheckboxModule
  ],
  standalone: true
})
export class PrimeCheckboxType extends FieldType<FieldTypeConfig> {

}
