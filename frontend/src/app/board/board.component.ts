import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { Piece, Color, IMove } from 'shashki-logic';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() gameId: string;
  @Input() color: Color;

  board: Piece[][];
  moves: { moves: IMove[], beats: IMove[] } = { moves: [], beats: [] };
  selectedMoves: IMove[];

  constructor(private _game: GameService) { }

  ngOnInit() {
    this.updateMoves();
    this.board = this._game.getBoard();
  }

  getMoves(x: number, y: number) {
    if (this.moves.beats.length === 0) {
      return this.moves.moves.filter((move) => move.fromX === x && move.fromY === y);
    }
    return this.moves.beats.filter((move) => move.fromX === x && move.fromY === y);
  }

  updateMoves() {
    this.moves = this._game.getMoves();
    console.log(this.moves);
  }

  isHighlighted(x: number, y: number) {
    return this.selectedMoves && this.selectedMoves.some((m) => m.toX === x && m.toY === y);
  }

  move(x: number, y: number) {
    const move = this.selectedMoves && this.selectedMoves.filter((m) => m.toX === x && m.toY === y);

    if (move && move.length > 0) {
      this._game.performMove(move[0]);
    }
  }
}
