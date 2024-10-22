import { Component, inject, Input } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { PRIMENG_INPUT_THEME_PRESET } from '../../../configs/primeng-theme-preset';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

export interface IInput {
  header?: string;
  subheader?: string;
  style?: object;
  styleClass?: string;
  wrapClass?: string;
  content?: string;
}

@Component({
  selector: 'cmp-input-for-storybook-only',
  standalone: true,
  template: `<input
    [variant]="variant"
    [placeholder]="placeholder"
    [disabled]="disabled"
    [value]="value"
    pInputText>`,
  imports: [
    ReactiveFormsModule,
    InputTextModule
  ]
})
export class InputComponent {
  @Input() placeholder?: string;
  @Input() inputConfig?: IInput;
  @Input() value?: string;
  @Input() variant: 'filled' | 'outlined' = 'outlined';
  @Input() disabled: boolean = false;
  public primeNGConfig: PrimeNGConfig = inject(PrimeNGConfig);

  constructor(){
    this.primeNGConfig.theme.set({
      preset: PRIMENG_INPUT_THEME_PRESET,
    });
  }
}
