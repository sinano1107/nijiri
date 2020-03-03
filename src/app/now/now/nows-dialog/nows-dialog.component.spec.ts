import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NowsDialogComponent } from './nows-dialog.component';

describe('NowsDialogComponent', () => {
  let component: NowsDialogComponent;
  let fixture: ComponentFixture<NowsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NowsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NowsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
