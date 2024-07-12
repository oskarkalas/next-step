

export enum MessageSeverity  {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  LOADER = 'LOADER',
  INFO = 'INFO',
  WARNING = 'WARNING',
}

export enum MessageView {
  MODAL = 'MODAL',
  FLASH = 'FLASH',
  TOAST = 'TOAST',
  TEXT = 'TEXT',
}

export enum MessageCategory {
  TEST = 'TEST',
  ERROR = 'ERROR',
  NETWORK_ERROR= 'NETWORK_ERROR',
  LOGIN_ERROR= 'NETWORK_ERRORS'
}

export interface MessageModel {
  id?: number ;
  severity?: MessageSeverity;
  view?: MessageView;
  message?: any;
  messageConfig?: any;
}
