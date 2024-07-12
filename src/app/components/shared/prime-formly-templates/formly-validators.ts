import {AbstractControl, ValidationErrors} from "@angular/forms";

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  return !control.value || /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(control.value) ? null : { email: true};
}
