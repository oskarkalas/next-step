import {Component} from "@angular/core";
import {fromEvent, merge, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {MessagesModule} from "primeng/messages";
import {Store} from "@ngrx/store";
import {selectFilteredMessagesByType} from "./state/reducers/message.reducer";
import {PrimeNGConfig, ToastMessageOptions} from "primeng/api";
import {MessageView} from "./components/shared/messages/messages.enum";
import {MESSAGING_ACTIONS} from "./state/actions/messages.actions";
import {MessageToastComponent} from "./components/shared/messages/message-toast.component";
import {ToastCloseEvent} from "primeng/toast";
import {Aura} from "primeng/themes/aura";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    RouterOutlet,
    MessagesModule,
    JsonPipe,
    MessageToastComponent,
  ],
  template: `
      <app-messages-toast [messages]="(messages | async)!"
                          (onClose)="closeToastMessage($event)"
                          [position]="'top-right'">
      </app-messages-toast>
      <router-outlet></router-outlet>
      <ng-container *ngIf="(onlineOffline | async) === false">
        <span>{{ 'offlineStatusText' }}</span>
      </ng-container>
  `
})
export class AppComponent {
  public onlineOffline: Observable<boolean>;
  protected messages: Observable<Array<ToastMessageOptions>>;

  constructor(private store: Store, private config: PrimeNGConfig) {
    this.config.theme.set({ preset: Aura });
    this.config.ripple.set(true);
    // online offline check
    this.onlineOffline = merge(of(navigator.onLine),
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    );
    this.messages = this.store.select(selectFilteredMessagesByType(MessageView.TOAST));
  }

  closeToastMessage(event: ToastCloseEvent) {
    this.store.dispatch(MESSAGING_ACTIONS.removeMassage({ id: event.message.id }))
  }
}
