import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerComponent } from './divider.component';

describe('DividerComponent', () => {
  let component: DividerComponent;
  let fixture: ComponentFixture<DividerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
