import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { Piece, Color, IMove, EndResult } from '../../../../logic/src/game';
import { SocketService } from '../socket.service';
import { EndComponent } from '../end/end.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DialogService } from '../dialogs/dialog.service';

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
  history: IMove[] = [];
  rotated = false;

  constructor(private _game: GameService, private _socket: SocketService,
    private _activeRoute: ActivatedRoute, private _dialog: DialogService) { }

  ngOnInit() {
    this.updateMoves();
    this.board = this._game.getBoard();
    this.rotated = !!this._game.playerColor;
    this._socket.move.subscribe((move) => {
      this.updateMoves();
      this.addMoveToHistory(move);
    });
    const visible = this._activeRoute.snapshot.paramMap.get('public') !== 'false';
  }

  getMoves(x: number, y: number) {
    if (this.moves.beats.length === 0) {
      return this.moves.moves.filter((move) => move.fromX === x && move.fromY === y);
    }
    return this.moves.beats.filter((move) => move.fromX === x && move.fromY === y);
  }

  updateMoves() {
    this.moves = this._game.getMoves();
  }

  isHighlighted(x: number, y: number) {
    return this.selectedMoves && this.selectedMoves.some((m) => m.toX === x && m.toY === y);
  }

  move(x: number, y: number) {
    const move = this.selectedMoves && this.selectedMoves.filter((m) => m.toX === x && m.toY === y);
    this.selectedMoves = null;
    if (move && move.length > 0) {
      this._game.performMove(move[0]);
    }
  }

  addMoveToHistory(move: IMove) {
    if (!move.beatX) {
      this.history = [];
    }

    this.history.push(move);
  }

  isVisited(x: number, y: number) {
    return this.history.some((m) => m.fromX === x && m.fromY === y);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this._socket.socket || !this._socket.socket.connected) {
      return true;
    }

    return new Observable<boolean>((subscriber) => {
      this._dialog.confirm('Exit game?').subscribe((result) => {
        if (result) {
          // Disconnect socket
          this._socket.disconnect();
        }
        subscriber.next(result);
      }, (error) => subscriber.error(error));
    });
  }
}
