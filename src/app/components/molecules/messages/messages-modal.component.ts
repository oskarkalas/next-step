import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import { MessageModel } from "./messages.enum";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-messages-modal',
  standalone: true,
  imports: [
    InputTextareaModule,
    ButtonModule
  ],
  template: `
    <textarea style="width: 100%" [disabled]="true" [autoResize]="true" pInputTextarea>{{ dialogMessage }}</textarea>
    <div class="flex justify-content-center pt-4"><p-button label="Close" (click)="closeDialog()"></p-button></div>
  `
})
export class MessagesModalComponent implements OnInit {
  dialogContent: MessageModel | undefined;
  dialogMessage: string | undefined;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private dynamicDialogRef: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.dialogContent = this.dialogConfig.data as MessageModel;
    this.dialogMessage = JSON.stringify(this.dialogContent.message);
  }

  closeDialog() {
    this.dynamicDialogRef.close()
  }
}
