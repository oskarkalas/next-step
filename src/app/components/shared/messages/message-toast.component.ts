import {Component, Input, OnDestroy} from '@angular/core';
import {ToastCloseEvent, ToastModule, ToastPositionType} from "primeng/toast";
import {MESSAGING_ACTIONS} from "../../state/actions/messages.actions";
import {Store} from "@ngrx/store";
import {selectFilteredMessagesByType} from "../../state/reducers/message.reducer";
import {MessageModel, MessageView} from "./messages.enum";
import {Observable, Subscription} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-messages-toast',
  standalone: true,
  imports: [
    ToastModule,
  ],
  template: `
    <p-toast [position]="position" (onClose)="clearCenterToast($event)"></p-toast>
  `
})
export class MessageToastComponent implements OnDestroy {
  @Input() position: ToastPositionType = 'top-center';
  toastMessages: Observable<Array<MessageModel | undefined>>;
  toastMessageSubscription: Subscription;

  constructor( private store: Store,  private messageService: MessageService) {
    this.toastMessages = this.store.select(selectFilteredMessagesByType(MessageView.TOAST));
    this.toastMessageSubscription = this.toastMessages.subscribe(msg => {
      if(msg.length < 2) {
        this.messageService.add(msg.map(value => (
          {
            severity: value?.severity?.toLowerCase(),
            summary: value?.messageConfig?.header,
            detail: value?.message,
            id: value?.id
          }))[0])
      }
    })
  }

  ngOnDestroy() {
    this.toastMessageSubscription?.unsubscribe();
  }

  clearCenterToast(event: ToastCloseEvent) {
    this.store.dispatch(MESSAGING_ACTIONS.removeMassage({id: event.message.id}))
  }
}
