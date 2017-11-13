import { Component, OnInit } from '@angular/core';
import { StatsService } from '../stats.service';

@Component({
  selector: 'app-mute-button',
  templateUrl: './mute-button.component.html',
  styleUrls: ['./mute-button.component.scss']
})
export class MuteButtonComponent implements OnInit {

  constructor(public _stats: StatsService) { }

  ngOnInit() {
    this._stats.muted = localStorage.getItem('muted') === 'true';
  }

  toggleMuted() {
    this._stats.muted = !this._stats.muted;
    localStorage.setItem('muted', this._stats.muted.toString());
  }

}
