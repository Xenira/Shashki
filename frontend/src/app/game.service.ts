/// <reference path="../../node_modules/shashki-logic/dist/game.d.ts" />

import { Injectable } from '@angular/core';
import Game from 'shashki-logic';
import { Piece, Color } from 'shashki-logic';

@Injectable()
export class GameService {

  game = new Game();
  playerColor: Color = Color.LIGHT;

  beats: {[key: string]: boolean} = {};

  constructor() { }

  getBoard() {
    return this.game.board;
  }

  getMoves(x: number, y: number, piece: Piece) {
    if (this.playerColor !== piece.color || !this.isMyTurn()) {
      return { moves: [], beats: [] };
    }
    const moves = this.game.getPossibleMoves(x, y, piece.color, piece.king);
    if (moves.beats.length || moves.moves.length) {
      console.log(x, y, piece, moves);
    }
    return moves;
  }

  isMyTurn() {
    return this.game.currentPlayer === this.playerColor;
  }

  canBeat() {

  }

}
