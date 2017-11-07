import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BoardComponent } from '../board/board.component';
import { GameService } from '../game.service';
import { SocketService } from '../socket.service';

@Injectable()
export class CanActivateGuard implements CanActivate {

  constructor(private _socket: SocketService, private _router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    switch (next.component) {
      case BoardComponent:
        if (!this._socket.socket || !this._socket.socket.connected) {
          this._router.navigate(['']);
          return false;
        }
    }
    return true;
  }
}
