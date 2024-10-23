import { Component, Input } from '@angular/core';
import { ButtonModule, ButtonProps } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <div [class]="customClass">
      <p-button [buttonProps]="buttonProps" [severity]="severity"></p-button>
    </div>`,
  imports: [
    ButtonModule
  ]
})
export class ButtonComponent {
  @Input() buttonProps: ButtonProps = {};
  @Input() severity: 'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined;
  @Input() customClass: string | undefined ;
}
