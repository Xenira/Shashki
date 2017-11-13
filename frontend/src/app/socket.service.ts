import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { NotificationService } from './notification.service';
import { Subject } from 'rxjs/Subject';
import { Color, IMove } from '../../../logic/src/game';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class SocketService {

  socket: SocketIOClient.Socket;
  start = new Subject<{ color: Color, id: string }>();
  onGameid = new Subject<string>();
  onDisconnect = new Subject<void>();
  onMove = new Subject<IMove>();

  constructor(private _notification: NotificationService, private _router: Router) { }

  newGame(visible: boolean) {
    this.initializeSocket().then(() => {
      this.socket.emit('start', visible);
    }).catch((err) => console.error(err));
  }

  joinGame(id: string) {
    this.initializeSocket().then(() => {
      this.socket.emit('join', id);
    }).catch((err) => console.error(err));
  }

  private initializeSocket() {
    if (this.socket) {
      console.error('Already connected');
      return;
    }
    this.socket = io(environment.socket);
    this.socket.on('notification', (message) => this._notification.showNotification(message));
    this.socket.on('start', (color, id) => this.start.next({ color, id }));
    this.socket.on('gameid', (id) => this.onGameid.next(id));
    this.socket.on('move', (move) => this.onMove.next(move));
    this.socket.on('disconnect', () => this.disconnected());

    return new Promise((resolve, reject) => {
      this.socket.on('connect', resolve);
      setTimeout(reject, 1000);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  disconnected() {
    this.onDisconnect.next();
    this.socket = null;
    this._router.navigate(['']);
  }

  performMove(move: IMove) {
    this.socket.emit('move', move);
  }

  rematch() {
    this.socket.emit('rematch');
  }

}
