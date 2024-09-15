import {Component, inject, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {SETTINGS_ACTIONS} from "../../state/actions/settings.actions";
import {Observable, take} from "rxjs";
import {User} from "../../../generated/gql.types";
import {selectSettingsMe} from "../../state/selectors/settings.selectors";
import {AsyncPipe, NgIf} from "@angular/common";
import {LayoutComponent} from "../../components/layout/layout.component";
import {MenuComponent, MenuConfigModel} from "../../components/menu/menu.component";
import {map} from "rxjs/operators";
import {
  DrawerSecondaryComponent,
  SecondaryDrawerConfigModel
} from "../../components/layout/drawer/drawer-secondary.component";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    LayoutComponent,
    MenuComponent,
    DrawerSecondaryComponent
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  me$: Observable<User | null> | undefined;
  authService: AuthService = inject(AuthService);
  private config: SecondaryDrawerConfigModel = {items: []};
  private menuConfig: MenuConfigModel = {items: []};

  constructor(private store: Store) {
    store.dispatch(SETTINGS_ACTIONS.loadMe());
  }

  ngOnInit(): void {
    this.me$ = this.store.select(selectSettingsMe);
    this.drawerConfigData();
    this.createMenuConfig();
  }

  get drawerConfig(): SecondaryDrawerConfigModel {
    return this.config;
  }
  get menuConfigData(): MenuConfigModel {
    return this.menuConfig;
  }

  private createMenuConfig(): void {
     this.me$?.pipe(
      take(2),
      map(me => {
        return {
          logo: {
            name: 'mashrooms',
            url: '/'
          },
          items: [
            {
              label: "Home",
              route: "home",
            },
            {
              label: "About",
              route: "about"
            }
          ],
          user: me || undefined,
        }
      })
    ).subscribe(menu => this.menuConfig = menu);
  }

  private drawerConfigData() {
    this.me$?.pipe(
      take(2),
      map(me => (
        {
          user: me || undefined,
          items: [
            {
              icon: 'pi pi-cog',
              label: "Settings",
            },
            {
              icon: 'pi pi-sign-out',
              label: "Logout",
              command: () => {
                this.authService.logout();
              }
            }
          ]
        }
      )),
    ).subscribe(config =>
      this.config = config
    );
  }
}
