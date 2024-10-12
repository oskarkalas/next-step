import {Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {FieldType, FieldTypeConfig} from '@ngx-formly/core';
import {CheckboxModule} from "primeng/checkbox";

@Component({
  selector: 'formly-primeng-input-text',
  template: `
      <p-checkbox
        [id]="key"
        [value]="0"
        [binary]="false"
        [formControl]="formControl"></p-checkbox>
<!--      {{formControl.value}}value-->
  `,
  imports: [
    ReactiveFormsModule,
    CheckboxModule
  ],
  standalone: true
})
export class PrimeCheckboxType extends FieldType<FieldTypeConfig> {

}
