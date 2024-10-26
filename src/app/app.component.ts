import { Component, inject } from '@angular/core';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { ToastCloseEvent } from 'primeng/toast';
import { Store } from '@ngrx/store';
import { selectFilteredMessagesByType } from './state/reducers/message.reducer';
import { PrimeNGConfig, ToastMessageOptions } from 'primeng/api';
import { MessageView } from './components/molecules/messages/messages.enum';
import { MESSAGING_ACTIONS } from './state/actions/messages.actions';
import { MessageToastComponent } from './components/molecules/messages/message-toast.component';
import { PRIMENG_THEME_PRESET } from './configs/primeng/primeng-theme-preset';

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
      @if((onlineOffline | async) === false) {
        <span>{{ 'offlineStatusText' }}</span>
      }
  `
})
export class AppComponent {
  public onlineOffline: Observable<boolean>;
  protected messages: Observable<Array<ToastMessageOptions>>;
  public primeNGConfig: PrimeNGConfig = inject(PrimeNGConfig);

  constructor(private store: Store) {
    this.primeNGConfig.theme.set({
      ...PRIMENG_THEME_PRESET
    });
    this.primeNGConfig.ripple.set(true);

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
