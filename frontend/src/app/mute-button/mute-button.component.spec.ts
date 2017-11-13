import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuteButtonComponent } from './mute-button.component';

describe('MuteButtonComponent', () => {
  let component: MuteButtonComponent;
  let fixture: ComponentFixture<MuteButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuteButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
