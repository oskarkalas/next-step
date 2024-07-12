import {Component} from "@angular/core";
import {fromEvent, merge, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {AsyncPipe, NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {AuthSignInComponent} from "./components/auth/auth-sign-in.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    AuthSignInComponent
  ],
  template: `
    <app-auth-sign-in></app-auth-sign-in>
    <ng-container *ngIf="(onlineOffline | async) === false">
      <span>{{ 'offlineStatusText' }}</span>
    </ng-container>
  `
})
export class AppComponent {
  public onlineOffline: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    console.log('AppComponent');
    const token = this.activatedRoute.snapshot.paramMap.get('accessToken');
    console.log(token);
    // online offline check
    this.onlineOffline = merge(of(navigator.onLine),
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    );
  }
}
