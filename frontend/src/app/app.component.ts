import { Component, OnInit } from '@angular/core';
import { AdblockService } from './adblock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _adblock: AdblockService) { }

  ngOnInit(): void {
    this._adblock.check();
  }
}
