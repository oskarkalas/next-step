import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  styleUrl: './layout.component.scss',
  standalone: true,
  template: `
    <div class="pageLayoutWrapper">
      <div slot="slotMenu">
        <ng-content select="[slot-menu]"></ng-content>
      </div>
      <div class="slotHeader">
        <ng-content select="[slot-header]"></ng-content>
      </div>
      <div class="slotContent">
        <ng-content select="[slot-content]"></ng-content>
      </div>
    </div>
  `
})
export class LayoutComponent {}
