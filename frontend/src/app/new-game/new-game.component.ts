import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../socket.service';
import { GameService } from '../game.service';
import { Observable } from 'rxjs/Observable';
import { DialogService } from '../dialogs/dialog.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  visible: boolean;
  id: string;
  points = '';
  gameStarted = false;

  constructor(private _activeRoute: ActivatedRoute, private _socket: SocketService,
    private _gameService: GameService, private _router: Router, private _dialog: DialogService) { }

  ngOnInit() {
    this.visible = this._activeRoute.snapshot.paramMap.get('public') !== 'false';
    this._socket.start.subscribe((game) => this.startGame(game.color, game.id));
    this._socket.gameid.subscribe((id) => this.id = id);
    this._socket.newGame(this.visible);

    setInterval(() => {
      this.points.length < 3 ? this.points += '.' : this.points = '';
    }, 1500);
  }

  startGame(color, id) {
    this.gameStarted = true;
    this._gameService.reset(color);
    this._router.navigate(['/game']);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.gameStarted) {
      return true;
    }

    if (this.visible || !this._socket.socket || !this._socket.disconnected) {
      this._socket.disconnect();
      return true;
    }

    return new Observable<boolean>((subscriber) => {
      this._dialog.confirm('Close this game instance?').subscribe((result) => {
        if (result) {
          // Disconnect socket
          this._socket.disconnect();
        }
        subscriber.next(result);
      }, (error) => subscriber.error(error));
    });
  }

}
