import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-player-turn-indicator',
  templateUrl: './player-turn-indicator.component.html',
  styleUrls: ['./player-turn-indicator.component.scss']
})
export class PlayerTurnIndicatorComponent implements OnInit {

  player: number;

  constructor(private _game: GameService) { }

  ngOnInit() {
    this.player = this._game.playerColor;
  }

}
