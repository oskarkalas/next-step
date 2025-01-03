import { Component, inject, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { PrimeNG } from 'primeng/config';
import { CardModule } from 'primeng/card';
import { PRIMENG_CART_THEME_PRESET } from '../../../configs/primeng/primeng-theme-preset';

export interface ICard {
  header?: string;
  subheader?: string;
  style?: object;
  styleClass?: string;
  wrapClass?: string;
  content?: string;
}

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card" [class]="wrapClass || cardConfig?.wrapClass">
      <p-card
        [header]="header || cardConfig?.header "
        [subheader]="subheader || cardConfig?.subheader"
        [style]="style || cardConfig?.style "
        [styleClass]="cardConfig?.styleClass"
      >
        @if (content || cardConfig?.content) {
        <div class="card-content"  [innerHTML]="content|| cardConfig?.content"></div>
        }
        <ng-content></ng-content>
      </p-card>
    </div>`,
  imports: [
    CardModule,
    NgIf
  ]
})
export class CardComponent {
  @Input() cardConfig: ICard | undefined;
  @Input() header?: string;
  @Input() style?: object;
  @Input() styleClass?: string;
  @Input() customClass?: string;
  @Input() subheader?: string;
  @Input() content?: string;
  @Input() wrapClass?: string;

  public primeNGConfig: PrimeNG = inject(PrimeNG);

  constructor(){
    this.primeNGConfig.theme.set({
      preset: PRIMENG_CART_THEME_PRESET,
    });
  }
}
