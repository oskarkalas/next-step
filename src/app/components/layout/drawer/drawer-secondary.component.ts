import {Component, inject, Input } from '@angular/core';
import {Drawer} from "primeng/drawer";
import {DrawerService} from "./drawer.service";
import {MenuItem, SharedModule} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {User} from "../../../../generated/gql.types";
import {UserAvatarComponent} from "../../design/user-avatar/user-avatar.component";
import {DividerModule} from "primeng/divider";
import {AuthService} from "../../../services/auth.service";

export interface SecondaryDrawerConfigModel {
  user?: User;
  items?: Array<MenuItem>;
}

export type SecondaryDrawerType = 'left' | 'right' | 'top' | 'bottom';

@Component({
  selector: 'app-secondary-drawer',
  standalone: true,
  imports: [
    Drawer,
    SharedModule,
    ButtonModule,
    UserAvatarComponent,
    DividerModule
  ],
  styleUrls: ['./drawer-secondary.component.scss'],
  template: `
    <p-drawer class="secDrawer"
              [visible]="visibleSecondaryToolbar.secondaryDrawerStatus"
              [position]="position"
    >
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
          <p-button (click)="logoutUser()" icon="pi pi-sign-out"></p-button>
        </div>
        </div>
      </ng-template>

    </p-drawer>
  `
})
export class DrawerSecondaryComponent {
  @Input() position: SecondaryDrawerType = 'right';
  @Input() drawerConfig?: SecondaryDrawerConfigModel | null;

  visibleSecondaryToolbar = inject(DrawerService);
  authService = inject(AuthService);

  closeCallback() {
    this.visibleSecondaryToolbar.secondaryDrawerToggle()
  }

  logoutUser() {
      this.authService.logout();
  }
}
