import {Component, inject, Input } from '@angular/core';
import {Drawer} from "primeng/drawer";
import {DrawerService} from "./drawer.service";
import {MenuItem, SharedModule} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {User} from "../../../../generated/gql.types";
import {UserAvatarComponent} from "../../design/user-avatar/user-avatar.component";
import {DividerModule} from "primeng/divider";
import {MenuModule} from "primeng/menu";

export interface SecondaryDrawerConfigModel {
  user?: User;
  items: Array<MenuItem>;
}

export type SecondaryDrawerPositionType = 'left' | 'right' | 'top' | 'bottom';

@Component({
  selector: 'app-secondary-drawer',
  standalone: true,
  imports: [
    Drawer,
    SharedModule,
    ButtonModule,
    UserAvatarComponent,
    DividerModule,
    MenuModule
  ],
  styleUrls: ['./drawer-secondary.component.scss'],
  template: `
    <p-drawer class="secDrawer"
              [style]="{width: '350px', borderRadius: '16px 0 0 16px'}"
              [visible]="visibleSecondaryToolbar.secondaryDrawerStatus"
              [position]="position">
      <ng-template pTemplate="headless">
        <div class="secDrawer-container">
          <div class="secDrawer-header">
            <div class="secDrawer-header-user">
              <app-user-avatar [userData]="drawerConfig?.user"></app-user-avatar>
              <div class="secDrawer-header-user-content">
                <strong>{{ drawerConfig?.user?.email }}</strong>
                <span>{{ drawerConfig?.user?.firstName }} {{ drawerConfig?.user?.lastName }}</span>
              </div>
            </div>
            <p-button type="button"
                      (click)="closeCallback()"
                      rounded="true"
                      icon="pi pi-times"
                      [text]="true">
            </p-button>
          </div>
          <p-divider></p-divider>
          <div class="secDrawer-menuList">
            <p-menu class="secDrawer-menu" [model]="drawerConfig?.items"/>
          </div>
        </div>
      </ng-template>
    </p-drawer>
  `
})
export class DrawerSecondaryComponent {
  @Input() position: SecondaryDrawerPositionType = 'right';
  @Input() drawerConfig?: SecondaryDrawerConfigModel | null;

  visibleSecondaryToolbar: DrawerService = inject(DrawerService);

  closeCallback() {
    this.visibleSecondaryToolbar.secondaryDrawerToggle()
  }
}
