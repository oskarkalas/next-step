import { Component, Input } from '@angular/core';
import {FieldWrapper, FormlyModule} from '@ngx-formly/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'formly-wrapper-panel',
  styleUrls: ['./prime-field-wrapper.scss'],
  template: `
    <div class="formlyWrapper-panel" [class]="customClass">
      @if (props['group']) {
        <strong class="formlyWrapper-label-group">{{ props.label }}</strong>
      } @else {
        <label class="formlyWrapper-label" [for]="key">{{ props.label }}</label>
      }
      <div class="formlyWrapper-content">
        <ng-container #fieldComponent></ng-container>
        @if (formControl.touched) {
          <small class="formlyWrapper-errorMsg">
            <formly-validation-message #validationMessage [field]="field"></formly-validation-message>
          </small>
        }
      </div>
    </div>
  `,
  imports: [
    FormlyModule,
    NgIf
  ],
  standalone: true
})
export class PrimeFieldWrapper extends FieldWrapper {
  @Input() customClass: string | undefined;
}
