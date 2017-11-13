import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdblockDialogComponent } from './adblock-dialog.component';

describe('AdblockDialogComponent', () => {
  let component: AdblockDialogComponent;
  let fixture: ComponentFixture<AdblockDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdblockDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdblockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
