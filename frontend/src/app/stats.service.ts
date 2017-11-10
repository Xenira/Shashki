import { Injectable } from '@angular/core';
import Game, { IMove, Color } from '../../../logic/src/game';
import { GameService } from './game.service';

const firstblood = new Audio('/assets/streaks/firstblood.wav');
const doublekill = new Audio('/assets/streaks/doublekill.wav');
const multikill = new Audio('/assets/streaks/multikill.wav');
const megakill = new Audio('/assets/streaks/megakill.wav');
const ultrakill = new Audio('/assets/streaks/ultrakill.wav');
const monsterkill = new Audio('/assets/streaks/monsterkill.wav');

const killingspree = new Audio('/assets/streaks/killingspree.wav');
const rampage = new Audio('/assets/streaks/rampage.wav');
const dominating = new Audio('/assets/streaks/dominating.wav');
const unstoppable = new Audio('/assets/streaks/unstoppable.wav');
const godlike = new Audio('/assets/streaks/godlike.wav');

@Injectable()
export class StatsService {

  firstBlood = false;
  streak = 0;
  successiveKills = 0;
  enemyStreak = 0;
  enemySuccessiveKills = 0;

  constructor() { }

  performMove(move: IMove, playerColor: Color, game: Game) {
    if (game.currentPlayer !== playerColor) {
      this.successiveKills = 0;
    } else {
      this.enemySuccessiveKills = 0;
    }

    if (move.hasOwnProperty('beatX')) {
      if (!this.firstBlood) {
        this.firstBlood = true;
        firstblood.play();
      }

      if (game.currentPlayer === playerColor) {
        this.streak++;
        this.successiveKills++;
        this.enemyStreak = 0;
      } else {
        this.enemyStreak++;
        this.enemySuccessiveKills++;
        this.streak = 0;
      }

      this.playSound();
    }
  }

  playSound() {
    this.playSuccessiveKills()
      .then(() => this.playKillingSpree());
  }

  async playSuccessiveKills(): Promise<void> {
    switch (Math.max(this.successiveKills, this.enemySuccessiveKills)) {
      case 2:
        return await doublekill.play();
      case 3:
        return await multikill.play();
      case 4:
        return await megakill.play();
      case 5:
        return await ultrakill.play();
      case 6:
        return await monsterkill.play();
    }
  }

  playKillingSpree() {
    switch (Math.max(this.streak, this.enemyStreak)) {
      case 3:
        return killingspree.play();
      case 6:
        return rampage.play();
      case 9:
        return dominating.play();
      case 12:
        return unstoppable.play();
      case 14:
        return godlike.play();
    }
  }

  reset() {
    this.firstBlood = false;
    this.streak = 0;
    this.successiveKills = 0;
    this.enemyStreak = 0;
    this.enemySuccessiveKills = 0;
  }

}
