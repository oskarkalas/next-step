import {Component, Input} from '@angular/core';
import {ToolbarModule} from "primeng/toolbar";
import {AvatarModule} from "primeng/avatar";
import {MenuItem, SharedModule} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {User} from "../../../generated/gql.types";
import {NgOptimizedImage} from "@angular/common";

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
  imports: [ToolbarModule, AvatarModule, SharedModule, ButtonModule, NgOptimizedImage]
})
export class MenuComponent {
  @Input() menuConfig?: MenuConfigModel | null;

  getInitialFromName(user: User | null | undefined): string {
    if(user?.lastName && user?.firstName) {
      return (user?.firstName.slice(0,1) + user?.lastName.slice(0,1)).toUpperCase();
    } else {
      return 'U';
    }
  }
}
