import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../socket.service';
import { GameService } from '../game.service';
import { DialogService } from '../dialogs/dialog.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {

  public id: string;
  gameStarted = true;

  constructor(private _activeRoute: ActivatedRoute, private _router: Router,
    private _dialog: DialogService, private _socket: SocketService,
    private _gameService: GameService) { }

  ngOnInit() {
    this.id = this._activeRoute.snapshot.paramMap.get('id');
    this._socket.start.subscribe((game) => this.startGame(game.color, game.id));
    if (this.id) {
      this.joinGame(this.id);
    }
  }

  joinGame(id: string) {
    // TODO: add spectator logic
    this._socket.joinGame(this.id);
  }

  startGame(color, id) {
    this._gameService.reset(color);
    this._router.navigate(['/game']);
  }

  setId(id: string) {
    if (!id || id.length !== 9) {
      return;
    }

    this.id = id;
    this.joinGame(this.id);
  }

  canDeactivate(): Observable<boolean> | boolean {
    return this.gameStarted || !this._socket.socket || !this._socket.socket.connected;
  }
}
