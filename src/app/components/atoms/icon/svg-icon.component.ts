import { Component, Input } from '@angular/core';
import { IconSpriteModule } from 'ng-svg-icon-sprite';

@Component({
  selector: 'spa-icon',
  template: `
    <svg-icon-sprite
    [src]="'/assets/sprite/sprite.svg#' + iconName"
    [width]="iconSize + 'px'"
    [style.color]="color || 'inherit'"
    [viewBox]="'0 0 18 18'"
    [classes]="iconClass">
    </svg-icon-sprite>`,
  imports: [IconSpriteModule],
  standalone: true,
})
export class SvgIconComponent {
  @Input() iconName: string;
  @Input() iconClass: string;
  @Input() color: string;
  @Input() iconSize = 20;
}
