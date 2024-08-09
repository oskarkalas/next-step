import {Component} from "@angular/core";
import {fromEvent, merge, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    RouterOutlet,
  ],
  template: `
    <ng-container *ngIf="(onlineOffline | async) === false">
      <span>{{ 'offlineStatusText' }}</span>
    </ng-container>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  public onlineOffline: Observable<boolean>;

  constructor() {
    // online offline check
    this.onlineOffline = merge(of(navigator.onLine),
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    );
  }
}
