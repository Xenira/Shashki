import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { JoinGameComponent } from '../join-game/join-game.component';
import { NewGameComponent } from '../new-game/new-game.component';
import { BoardComponent } from '../board/board.component';
import { CanActivateGuard } from './can-activate.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';

const routes: Routes = [
  {
    path: 'game',
    component: BoardComponent,
    canActivate: [CanActivateGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'new/:public', component: NewGameComponent,
    canActivate: [CanActivateGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'join/:id', component: JoinGameComponent,
    canActivate: [CanActivateGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'join', component: JoinGameComponent,
    canActivate: [CanActivateGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  { path: '', component: MenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanDeactivateGuard, CanActivateGuard]
})
export class BaseRouterModule { }
