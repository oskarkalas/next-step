import {Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {FieldType, FieldTypeConfig} from '@ngx-formly/core';
import {CheckboxModule} from "primeng/checkbox";

@Component({
  selector: 'formly-primeng-input-text',
  template: `
      <p-checkbox
        [id]="key"
        [binary]="props['binary'] || true"
        [name]="props['name']"
        [disabled]="props.disabled || false"
        [formControl]="formControl">
      </p-checkbox>
  `,
  imports: [
    ReactiveFormsModule,
    CheckboxModule
  ],
  standalone: true
})
export class PrimeCheckboxType extends FieldType<FieldTypeConfig> {

}
