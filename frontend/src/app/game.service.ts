/// <reference path="../../node_modules/shashki-logic/dist/game.d.ts" />

import { Injectable } from '@angular/core';
import Game from 'shashki-logic';
import { Piece, Color, IMove } from 'shashki-logic';
import { SocketService } from './socket.service';

@Injectable()
export class GameService {

  game = new Game();
  playerColor: Color = Color.LIGHT;

  beats: {[key: string]: boolean} = {};

  constructor(private _socket: SocketService) { }

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
