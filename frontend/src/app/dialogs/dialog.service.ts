import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs/Observable';
import { AdblockDialogComponent } from './adblock-dialog/adblock-dialog.component';

@Injectable()
export class DialogService {

  constructor(private _dialog: MatDialog) { }

  confirm(text: string, title: string = 'Confirmation', confirm: string = 'Yes', decline: string = 'No') {
    return new Observable<boolean>((subscriber) => {
      const ref = this._dialog.open(ConfirmDialogComponent, { data: {
        text, title, confirm, decline
      }});
      ref.beforeClose().subscribe((confirmed) => subscriber.next(!!confirmed),
        (error) => subscriber.error(error));
    });
  }

  adblock() {
    this._dialog.open(AdblockDialogComponent);
  }
}
