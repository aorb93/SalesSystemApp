import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPeriodComponent } from './dialog-period.component';

describe('DialogPeriodComponent', () => {
  let component: DialogPeriodComponent;
  let fixture: ComponentFixture<DialogPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogPeriodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
