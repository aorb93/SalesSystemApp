import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPaymentTypeComponent } from './dialog-payment-type.component';

describe('DialogPaymentTypeComponent', () => {
  let component: DialogPaymentTypeComponent;
  let fixture: ComponentFixture<DialogPaymentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogPaymentTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
