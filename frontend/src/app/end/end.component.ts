import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { EndResult } from '../../../../logic/src/game';

import * as nicejob from 'nicejob';
import * as moment from 'moment';
import { SocketService } from '../socket.service';

@Component({
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  quote: string;
  rematchPossible = true;

  constructor(private _router: Router,
    public _socket: SocketService,
    public dialogRef: MatDialogRef<EndComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { result: EndResult, stats: string }) { }

  ngOnInit() {
    this._socket.onDisconnect.subscribe(() => this.rematchPossible = false);
    if (this.data.result === EndResult.VICTORY) {
      return this.quote = nicejob();
    }
    this.quote = nicejob.not();
  }
}
