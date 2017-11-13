import { Injectable } from '@angular/core';
import adblock from 'just-detect-adblock';
import { DialogService } from './dialogs/dialog.service';

@Injectable()
export class AdblockService {

  constructor(private _dialog: DialogService) { }

  check(force = false) {
    console.log(adblock);
    if (force || !localStorage.getItem('adblock')) {
      localStorage.setItem('adblock', 'true');
      if (!adblock.isDetected()) {
        this._dialog.adblock();
      }
    }
  }

}
