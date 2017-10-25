import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { Piece, Color } from 'shashki-logic';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() gameId: string;
  @Input() color: Color;

  board: Piece[][];

  constructor(private _game: GameService) { }

  ngOnInit() {
    this.board = this._game.getBoard();
  }

  getMoves(x: number, y: number, piece: Piece) {
    return this._game.getMoves(x, y, piece);
  }

}
