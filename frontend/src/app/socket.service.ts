import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { NotificationService } from './notification.service';
import { Subject } from 'rxjs/Subject';
import { Color, IMove } from '../../../logic/src/game';
import { environment } from '../environments/environment';

@Injectable()
export class SocketService {

  socket: SocketIOClient.Socket;
  start = new Subject<{ color: Color, id: string }>();
  gameid = new Subject<string>();
  move = new Subject<IMove>();

  constructor(private _notification: NotificationService) { }

  newGame(visible: boolean) {
    this.initializeSocket().then(() => {
      this.socket.emit('start', visible);
    }).catch(() => {
    });
  }

  private initializeSocket() {
    if (this.socket) {
      throw new Error('Already connected.');
    }
    this.socket = io(environment.socket);
    this.socket.on('notification', (message) => this._notification.showNotification(message));
    this.socket.on('start', (color, id) => this.start.next({ color, id }));
    this.socket.on('gameid', (id) => this.gameid.next(id));
    this.socket.on('move', (move) => this.move.next(move));

    return new Promise((resolve, reject) => {
      this.socket.on('connect', resolve);
      setTimeout(reject, 1000);
    });
  }

  performMove(move: IMove) {
    this.socket.emit('move', move);
  }

}
