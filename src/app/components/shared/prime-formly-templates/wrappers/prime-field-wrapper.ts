import { Component, Input } from '@angular/core';
import {FieldWrapper, FormlyModule} from '@ngx-formly/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'formly-wrapper-panel',
  template: `
    <div class="formly-wrapper-panel" [class]="customClass">
      <div class="formly-wrapper-panel-label"><label>{{ props.label }}</label></div>
      <div class="w-full">
        <ng-container #fieldComponent></ng-container>
        <small class="p-error" *ngIf="formControl.touched">
          <formly-validation-message #validationMessage [field]="field"></formly-validation-message>
        </small>
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
