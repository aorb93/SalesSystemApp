import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSalesComponent } from './dialog-sales.component';

describe('DialogSalesComponent', () => {
  let component: DialogSalesComponent;
  let fixture: ComponentFixture<DialogSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogSalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
