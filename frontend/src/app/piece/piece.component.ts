import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Piece, IMove } from 'shashki-logic';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {

  @Input() piece: Piece;
  @Input() moves: IMove[];
  @Output() selected = new EventEmitter<IMove[]>();

  constructor() { }

  ngOnInit() {
  }

  pieceClicked() {
    this.selected.emit(this.moves);
  }
}
