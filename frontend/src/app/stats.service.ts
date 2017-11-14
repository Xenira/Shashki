import { Injectable } from '@angular/core';
import Game, { IMove, Color } from '../../../logic/src/game';
import { GameService } from './game.service';
import { Subject } from 'rxjs/Subject';

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

const win = new Audio('../../assets/streaks/winner.wav');
const lost = new Audio('../../assets/streaks/lostmatch.wav');

@Injectable()
export class StatsService {

  muted = false;

  firstBlood = false;
  streak = 0;
  successiveKills = 0;
  enemyStreak = 0;
  enemySuccessiveKills = 0;

  playbackEnd: Promise<void>;

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
        if (!this.muted) {
          firstblood.play();
        }
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

      if (!this.muted) {
        this.playSound();
      }
    }
  }

  playSound() {
    this.playbackEnd = new Promise<void>((resolve, reject) => {
      setTimeout(() => setTimeout(() => resolve(),
        this.playKillingSpree() * 1000),
        this.playSuccessiveKills() * 1000);
    });
  }

  playSuccessiveKills(): number {
    switch (Math.max(this.successiveKills, this.enemySuccessiveKills)) {
      case 2:
        doublekill.play();
        return doublekill.duration;
      case 3:
        multikill.play();
        return multikill.duration;
      case 4:
        megakill.play();
        return megakill.duration;
      case 5:
        ultrakill.play();
        return ultrakill.duration;
      case 6:
        monsterkill.play();
        return monsterkill.duration;
    }
    return 0;
  }

  playKillingSpree() {
    switch (Math.max(this.streak, this.enemyStreak)) {
      case 4:
        killingspree.play();
        return killingspree.duration;
      case 6:
        rampage.play();
        return rampage.duration;
      case 8:
        dominating.play();
        return dominating.duration;
      case 10:
        unstoppable.play();
        return unstoppable.duration;
      case 12:
        godlike.play();
        return godlike.duration;
    }
    return 0;
  }

  gameEnded(winner: boolean) {
    if (!this.muted) {
      this.playbackEnd.then(() => {
        if (winner) {
          win.play();
        } else {
          lost.play();
        }
      });
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
