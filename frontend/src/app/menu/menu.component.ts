import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  newGame(visible: boolean = true) {
    this._router.navigate(['/new', visible]);
  }

  joinGame() {
    this._router.navigate(['/join']);
  }

}
