import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveListComponent } from './move-list.component';

describe('MoveListComponent', () => {
  let component: MoveListComponent;
  let fixture: ComponentFixture<MoveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
