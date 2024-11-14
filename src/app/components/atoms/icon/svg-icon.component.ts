import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IconSpriteModule } from 'ng-svg-icon-sprite';

const DEFAULT_ICON_SIZE = 20;

@Component({
  selector: 'spa-icon',
  template: `
      <svg-icon-sprite
        [src]="src()"
        [width]="iconSize() + 'px'"
        [style.color]="color() || 'inherit'"
        [viewBox]="'0 0 18 18'">
      </svg-icon-sprite>
  `,
  imports: [IconSpriteModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent {
  iconName = input<string | undefined>(undefined);
  iconClass = input<string | undefined>(undefined);
  color = input<string | undefined>(undefined);
  iconSize = input<number>(DEFAULT_ICON_SIZE);
  src = computed(() => '/assets/sprites/icons.svg#' + this.iconName());
}
