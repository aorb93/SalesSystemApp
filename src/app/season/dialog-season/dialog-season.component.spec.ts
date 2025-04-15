import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSeasonComponent } from './dialog-season.component';

describe('DialogSeasonComponent', () => {
  let component: DialogSeasonComponent;
  let fixture: ComponentFixture<DialogSeasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogSeasonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
