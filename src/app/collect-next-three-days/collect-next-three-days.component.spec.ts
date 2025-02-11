import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectNextThreeDaysComponent } from './collect-next-three-days.component';

describe('CollectNextThreeDaysComponent', () => {
  let component: CollectNextThreeDaysComponent;
  let fixture: ComponentFixture<CollectNextThreeDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectNextThreeDaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectNextThreeDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
