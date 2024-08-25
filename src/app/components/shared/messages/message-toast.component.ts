import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ToastCloseEvent, ToastModule, ToastPositionType} from "primeng/toast";
import {Message, MessageService} from "primeng/api";

@Component({
  selector: 'app-messages-toast',
  standalone: true,
  imports: [
    ToastModule,
  ],
  providers: [
    MessageService
  ],
  template: `
    <p-toast [position]="position" (onClose)="onClose.emit($event)"></p-toast>
  `
})
export class MessageToastComponent  {
  @Input() position: ToastPositionType = 'top-center';
  @Input()
  set messages(msgArray:  Array<Message>) {
    this.messageService.clear();
    msgArray.map(value=> this.messageService.add(value));
  };
  @Output() onClose: EventEmitter<ToastCloseEvent> = new EventEmitter();
  constructor(private messageService: MessageService) {}
}
