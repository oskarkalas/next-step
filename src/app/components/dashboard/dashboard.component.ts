import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {loadMe} from "../../state/actions/settings.actions";
import {Observable} from "rxjs";
import {User} from "../../../generated/gql.types";
import {selectSettingsMe} from "../../state/selectors/settings.selectors";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  me: Observable<User | null> | undefined;

  constructor(private store: Store, private authService: AuthService) {
    store.dispatch(loadMe());
  }

  ngOnInit(): void {
    this.me = this.store.select(selectSettingsMe);
  }

  logout() {
    this.authService.logout();
  }
}
