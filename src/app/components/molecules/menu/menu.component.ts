import {Component, inject, Input} from '@angular/core';
import {ToolbarModule} from "primeng/toolbar";
import {AvatarModule} from "primeng/avatar";
import {MenuItem, SharedModule} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {User} from "../../../../generated/gql.types";
import {NgOptimizedImage} from "@angular/common";
import {DrawerService} from "../../layout/drawer/drawer.service";
import {UserAvatarComponent} from "../../atoms/user-avatar/user-avatar.component";

export interface MenuConfigModel  {
  logo?: {
    name: string;
    url?: string;
    imageUrl?: string;
  }
  items?: Array<MenuItem>;
  settings?: Array<MenuItem>;
  user?: User | null
}

@Component({
  selector: 'app-menubar',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [ToolbarModule, AvatarModule, SharedModule, ButtonModule, NgOptimizedImage, UserAvatarComponent]
})
export class MenuComponent {
  @Input() menuConfig?: MenuConfigModel | null;
  public drawersService = inject(DrawerService);
}
