import {Injectable} from '@angular/core';
import {MessageCategory, MessageModel, MessageSeverity, MessageView} from "./messages.enum";


@Injectable({
  providedIn: 'root'
})
export class MessageConfigService {
  messageConfigMap = new Map<MessageCategory, MessageModel>();

  constructor() {}

  public getConfigData(category: MessageCategory, messageData?: any): MessageModel {

    this.messageConfigMap.set(MessageCategory.NETWORK_ERROR, {
      id: 500,
      severity: MessageSeverity.ERROR,
      view: MessageView.TOAST,
      message: messageData,
      messageConfig: {header: messageData?.name}
    })

    this.messageConfigMap.set(MessageCategory.LOGIN_ERROR, {
      id: 403,
      severity: MessageSeverity.ERROR,
      view: MessageView.TEXT,
      message: 'messages.LOGIN_ERROR',
    })

    this.messageConfigMap.set(MessageCategory.ERROR, {
      severity: MessageSeverity.ERROR,
      view: MessageView.TOAST,
      message: 'messages.ERROR',
    })

    if(this.messageConfigMap.has(category)) {
      return <MessageModel>this.messageConfigMap.get(category);
    } else {
      return <MessageModel>this.messageConfigMap.get(MessageCategory.ERROR);
    }
  }
}
