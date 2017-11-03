import { Component, OnInit } from '@angular/core';
import { Color } from '../../../../logic/src/game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss']
})
export class MoveListComponent implements OnInit {

  moveTexts: string[];

  constructor(private _game: GameService) { }

  ngOnInit() {
    this.moveTexts = this._game.game.moveTexts;
  }

}
