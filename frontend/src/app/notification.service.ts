import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class NotificationService {

  constructor(private _snackbar: MatSnackBar) { }

  showNotification(message: string) {
    this._snackbar.open(message, null, { duration: 3000 });
  }
}
