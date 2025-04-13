import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGenderComponent } from './dialog-gender.component';

describe('DialogGenderComponent', () => {
  let component: DialogGenderComponent;
  let fixture: ComponentFixture<DialogGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogGenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
