import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BoardComponent } from '../board/board.component';
import { GameService } from '../game.service';
import { SocketService } from '../socket.service';
import { NewGameComponent } from '../new-game/new-game.component';

@Injectable()
export class CanActivateGuard implements CanActivate {

  constructor(private _socket: SocketService, private _router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (next.component === BoardComponent) {
      if (!this._socket.socket || !this._socket.socket.connected) {
        this._router.navigate(['']);
        return false;
      }
      document.getElementById('github-fork').style.display = 'none';
    } else {
      document.getElementById('github-fork').style.display = 'unset';
      if (!this._socket.socket || !this._socket.socket.connected) {
        this._socket.disconnect();
      }
    }
    return true;
  }
}
