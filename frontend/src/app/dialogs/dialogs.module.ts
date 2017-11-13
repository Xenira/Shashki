import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from './dialog.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MaterialModule } from '../material/material.module';
import { AdblockDialogComponent } from './adblock-dialog/adblock-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ConfirmDialogComponent, AdblockDialogComponent],
  entryComponents: [ConfirmDialogComponent, AdblockDialogComponent],
  providers: [DialogService]
})
export class DialogsModule { }
