import { Injectable } from '@angular/core';
import Game from '../../../logic/src/game';
import { Piece, Color, IMove, EndResult } from '../../../logic/src/game';
import { SocketService } from './socket.service';
import { MatDialog } from '@angular/material';
import { EndComponent } from './end/end.component';
import { StatsService } from './stats.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GameService {

  rematch = new Subject<void>();

  game = new Game();
  playerColor: Color = Color.LIGHT;

  beats: { [key: string]: boolean } = {};

  constructor(private _socket: SocketService, private _dialog: MatDialog,
    private _stats: StatsService) {
    this._socket.onMove.subscribe((move) => {
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
        }).afterClosed().subscribe((rematch) => {
          if (rematch) {
            this._socket.start.subscribe(game => {
              this.reset(game.color);
              this.rematch.next();
            });
            this._socket.rematch();
          } else {
            this._socket.disconnect();
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
