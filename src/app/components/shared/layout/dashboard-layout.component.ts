import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { Store } from "@ngrx/store";
import { LayoutOutletsEnum } from "./layout-outlets.enum";
import { Observable } from "rxjs";
import { AuthService } from "../../../services/auth.service";
import { RoutesPathsEnum } from "../../../core/enums/routes-paths.enum";
import { selectTitle,} from "../../../state/selectors/router.selectors";

@Component({
  selector: 'app-dashboard-layout',
  template: `
    <app-layout>
      <div slot-header>
        <div>
          <h2 *ngIf="(routerTitleName | async) as pageTitle">{{ 'pageTitle.' + pageTitle }}</h2>
        </div>

      </div>
      <div slot-menu>
        <p-megaMenu styleClass="flex">
          <ng-template pTemplate="start">
            <img src="https://primefaces.org/cdn/primeng/images/primeng.svg" height="40" class="mr-2" alt="" />
            <button (click)="sidebarVisible=!sidebarVisible">Menu</button>
          </ng-template>
          <ng-template pTemplate="end">
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
            <button (click)="logout()">logout</button>
          </ng-template>
        </p-megaMenu>
      </div>
      <div slot-content>
        <router-outlet [name]="LayoutOutletsEnum.MAIN"></router-outlet>
      </div>
    </app-layout>
    <p-sidebar [(visible)]="sidebarVisible">
      <p-menu [model]="items"></p-menu>
    </p-sidebar>
  `
})
export class DashboardLayoutComponent implements OnInit{
  sidebarVisible: boolean = false;
  items: MenuItem[] | undefined;
  routerTitleName: Observable<string | undefined>;
  protected readonly LayoutOutletsEnum = LayoutOutletsEnum;

  constructor(private store: Store, private authService: AuthService) {
    this.routerTitleName = this.store.select(selectTitle);
  }

  ngOnInit() {
    this.items = [
      {
        items: [
          {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: RoutesPathsEnum.DASHBOARD
          },
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            routerLink: RoutesPathsEnum.SETTINGS
          }
        ]
      },
    ];
  }

  logout() {
    this.authService.logout();
  }
}
