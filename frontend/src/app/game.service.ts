import { Injectable } from '@angular/core';
import Game from '../../../logic/src/game';
import { Piece, Color, IMove } from '../../../logic/src/game';
import { SocketService } from './socket.service';

@Injectable()
export class GameService {

  game = new Game();
  playerColor: Color = Color.LIGHT;

  beats: {[key: string]: boolean} = {};

  constructor(private _socket: SocketService) {
    this._socket.move.subscribe((move) => this.game.performMove(move));
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
  }

  performMove(move: IMove) {
    this._socket.performMove(move);
  }
}
