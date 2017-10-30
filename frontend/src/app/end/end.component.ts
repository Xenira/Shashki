import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { EndResult } from '../../../../logic/src/game';

import * as nicejob from 'nicejob';
import * as moment from 'moment';

@Component({
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  quote: string;

  constructor(private _router: Router,
    public dialogRef: MatDialogRef<EndComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { result: EndResult, stats: string }) { }

  ngOnInit() {
    if (this.data.result === EndResult.VICTORY) {
      return this.quote = nicejob();
    }

    this.quote = nicejob.not();
  }

  exit() {
    this.dialogRef.close();
    this._router.navigate(['/']);
  }
}
