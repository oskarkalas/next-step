import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {ProgressBarModule} from "primeng/progressbar";
import {FileUploadModule} from "primeng/fileupload";
import {MessagesModalComponent} from "./messages/messages-modal.component";
import {DialogService} from "primeng/dynamicdialog";
import {MessageToastComponent} from "./messages/message-toast.component";

@NgModule({
  declarations: [],
  exports: [MessageToastComponent],
  imports: [
    CommonModule,
    ButtonModule,
    ProgressBarModule,
    FileUploadModule,
    MessagesModalComponent,
    MessageToastComponent
  ], providers: [
    DialogService
  ]
})
export class SharedModule { }
