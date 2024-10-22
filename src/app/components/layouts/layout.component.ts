import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  styleUrl: './layout.component.scss',
  standalone: true,
  template: `
    <div class="pageLayout">
      <div slot="slotMenu">
        <ng-content select="[slot-menu]"></ng-content>
      </div>
      <div class="slotHeader">
        <ng-content select="[slot-header]"></ng-content>
      </div>
      <div class="slotToolbar">
        <ng-content select="[slot-toolbar]"></ng-content>
      </div>
      <div class="slotSecondaryToolbar">
        <ng-content select="[slot-secondary-toolbar]"></ng-content>
      </div>
      <div class="slotContent">
        <ng-content select="[slot-content]"></ng-content>
      </div>
      <div class="slotFooter">
        <ng-content select="[slot-footer]"></ng-content>
      </div>
    </div>
    layout works!
  `
})
export class LayoutComponent {}
