import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTurnIndicatorComponent } from './player-turn-indicator.component';

describe('PlayerTurnIndicatorComponent', () => {
  let component: PlayerTurnIndicatorComponent;
  let fixture: ComponentFixture<PlayerTurnIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerTurnIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerTurnIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
