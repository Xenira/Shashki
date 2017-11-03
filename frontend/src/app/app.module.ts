import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { GameService } from './game.service';
import { BaseRouterModule } from './base-router/base-router.module';
import { MaterialModule } from './material/material.module';
import { PieceComponent } from './piece/piece.component';
import { MenuComponent } from './menu/menu.component';
import { JoinGameComponent } from './join-game/join-game.component';
import { NewGameComponent } from './new-game/new-game.component';
import { SocketService } from './socket.service';
import { NotificationService } from './notification.service';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { DividerComponent } from './divider/divider.component';
import { EndComponent } from './end/end.component';
import { MoveListComponent } from './move-list/move-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PieceComponent,
    MenuComponent,
    JoinGameComponent,
    NewGameComponent,
    QrCodeComponent,
    DividerComponent,
    EndComponent,
    MoveListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    BaseRouterModule,
  ],
  entryComponents: [EndComponent],
  providers: [NotificationService, GameService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
