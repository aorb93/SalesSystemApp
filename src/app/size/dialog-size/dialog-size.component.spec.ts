import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSizeComponent } from './dialog-size.component';

describe('DialogSizeComponent', () => {
  let component: DialogSizeComponent;
  let fixture: ComponentFixture<DialogSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogSizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
