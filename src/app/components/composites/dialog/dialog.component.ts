import { Component, OnDestroy } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonComponent } from '../../atoms/button/button.component';
import { DialogContentComponent } from './dialog-content.component';

@Component({
  selector: 'app-example',
  template: `
    <app-button
      [severity]="'success'"
      [buttonProps]="{label: 'open dynamic dialog'}"
      (click)="openModal()"></app-button>`,
  imports: [
    ButtonComponent,
  ], providers: [DialogService],
  standalone: true
})
export class DialogComponent implements OnDestroy {
  ref: DynamicDialogRef | undefined;

  dialogProps: DynamicDialogConfig = {
    header: 'Dynamic dialog',
    width: '50vw',
    dismissableMask: true,
    modal: true,
    closable: true,
  };

  constructor(private dialogService: DialogService) {}

  openModal() {
    this.ref = this.dialogService.open(DialogContentComponent, {
     ...this.dialogProps
    });
  }

  ngOnDestroy() {
    this.ref?.destroy();
  }
}
