import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { JoinGameComponent } from '../join-game/join-game.component';
import { NewGameComponent } from '../new-game/new-game.component';
import { BoardComponent } from '../board/board.component';

const routes: Routes = [
  { path: 'game', component: BoardComponent },
  { path: 'new/:public', component: NewGameComponent },
  { path: 'join/:id', component: JoinGameComponent },
  { path: '', component: MenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BaseRouterModule { }
