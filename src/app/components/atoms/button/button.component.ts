import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonModule, ButtonProps } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <div [class]="customClass()">
      <p-button [buttonProps]="buttonProps()" [severity]="severity()"></p-button>
    </div>`,
  imports: [
    ButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  buttonProps = input<ButtonProps>({});
  severity = input<'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined>(null);
  customClass = input< string | undefined>('');
}
