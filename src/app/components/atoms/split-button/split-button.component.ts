import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonProps } from 'primeng/button';

@Component({
  selector: 'app-split-button',
  standalone: true,
  template: `
    <span [class]="customClass">
      <p-splitButton
        [label]="buttonProps?.label"
        [icon]="buttonProps?.icon"
        [severity]="severity"
        [dropdownIcon]="dropdownIcon"
        [model]="menuItems"
        (onClick)="onClick.emit($event)"
        (onDropdownClick)="onDropdownClick.emit($event)"
        (onMenuHide)="onMenuHide.emit($event)"
        (onMenuShow)="onMenuShow.emit($event)"
        >
      </p-splitButton>
    </span>`,
  imports: [SplitButtonModule],
})
export class SplitButtonComponent {
  @Input() buttonProps: ButtonProps = {};
  @Input() dropdownIcon: string | undefined = undefined;
  @Input() severity: 'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined;
  @Input() menuItems: MenuItem[] | undefined;
  @Input() customClass: string | undefined ;
  @Output() onClick:EventEmitter<MouseEvent> = new EventEmitter();
  @Output() onDropdownClick:EventEmitter<MouseEvent> = new EventEmitter();
  @Output() onMenuHide:EventEmitter<any> = new EventEmitter();
  @Output() onMenuShow:EventEmitter<any> = new EventEmitter();
}
