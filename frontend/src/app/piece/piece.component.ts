import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Piece, IMove } from '../../../../logic/src/game';

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

  getPlayerIcon() {
    return this.piece.color
      ? this.piece.king ? 'add_circle' : 'lens'
      : this.piece.king ? 'add_circle_outline' : 'panorama_fish_eye';
  }
}
