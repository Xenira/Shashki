import { Injectable } from '@angular/core';
import Game from '../../../logic/src/game';
import { Piece, Color, IMove, EndResult } from '../../../logic/src/game';
import { SocketService } from './socket.service';
import { MatDialog } from '@angular/material';
import { EndComponent } from './end/end.component';
import { StatsService } from './stats.service';

@Injectable()
export class GameService {

  game = new Game();
  playerColor: Color = Color.LIGHT;

  beats: { [key: string]: boolean } = {};

  constructor(private _socket: SocketService, private _dialog: MatDialog,
    private _stats: StatsService) {
    this._socket.move.subscribe((move) => {
      this._stats.performMove(move, this.playerColor, this.game);
      this.game.performMove(move);
      if (this.game.hasEnded) {
        this._dialog.open(EndComponent, {
          width: '100%',
          data: {
            result: this.game.winner === this.playerColor
              ? EndResult.VICTORY
              : this.game.winner === null ? EndResult.DRAW : EndResult.DEFEAT
          }
        });
      }
    });
  }

  getBoard() {
    return this.game.board;
  }

  getMoves(): { moves: IMove[], beats: IMove[] } {
    return this.game.getPlayerMoves(this.playerColor);
  }

  isMyTurn() {
    return this.game.currentPlayer === this.playerColor;
  }

  reset(color: Color) {
    this.playerColor = color;
    this.game = new Game();
    this._stats.reset();
  }

  performMove(move: IMove) {
    this._socket.performMove(move);
  }
}
