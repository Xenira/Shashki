import { Component, OnInit, Input } from '@angular/core';
import { Piece, IMove } from 'shashki-logic';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {

  @Input() piece: Piece;
  @Input() moves: { moves: IMove[], beats: IMove[] };

  constructor() { }

  ngOnInit() {
  }

}
