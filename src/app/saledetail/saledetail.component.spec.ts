import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaledetailComponent } from './saledetail.component';

describe('SaledetailComponent', () => {
  let component: SaledetailComponent;
  let fixture: ComponentFixture<SaledetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaledetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaledetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
