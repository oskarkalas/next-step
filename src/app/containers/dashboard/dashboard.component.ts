import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {SETTINGS_ACTIONS} from "../../state/actions/settings.actions";
import {Observable, take} from "rxjs";
import {User} from "../../../generated/gql.types";
import {selectSettingsMe} from "../../state/selectors/settings.selectors";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {LayoutComponent} from "../../components/layout/layout.component";
import {MenuComponent, MenuConfigModel} from "../../components/menu/menu.component";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    LayoutComponent,
    MenuComponent
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  me: Observable<User | null> | undefined;

  constructor(private store: Store, private authService: AuthService) {
    store.dispatch(SETTINGS_ACTIONS.loadMe());
  }

  ngOnInit(): void {
    this.me = this.store.select(selectSettingsMe);
  }

  logout() {
    this.authService.logout();
  }

  get menuConfig(): Observable<MenuConfigModel | null> | undefined {
    return  this.me?.pipe(
      take(1),
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
          user: me,
        }
      })
    )
  }
}
