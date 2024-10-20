import { Component } from '@angular/core';
import { FieldWrapper, FormlyModule } from '@ngx-formly/core';

@Component({
  selector: 'formly-checkbox-wrapper',
  styleUrls: ['./prime-field-wrapper.scss'],
  template: `
    <label class="checkboxWrapper" [class]="props.customClass">
          <ng-container #fieldComponent></ng-container>
      <span>{{ props.label }}</span>
    </label>
  `,
  imports: [
    FormlyModule,
  ],
  standalone: true
})
export class PrimeFieldCheckboxWrapper extends FieldWrapper {}
