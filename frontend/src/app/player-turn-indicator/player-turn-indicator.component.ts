import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Color } from '../../../../logic/src/game';

@Component({
  selector: 'app-player-turn-indicator',
  templateUrl: './player-turn-indicator.component.html',
  styleUrls: ['./player-turn-indicator.component.scss']
})
export class PlayerTurnIndicatorComponent implements OnInit {

  player: Color;

  constructor(public _game: GameService) { }

  ngOnInit() {
    this.player = this._game.playerColor;
  }

}
