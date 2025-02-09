import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectWeekComponent } from './collect-week.component';

describe('CollectWeekComponent', () => {
  let component: CollectWeekComponent;
  let fixture: ComponentFixture<CollectWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectWeekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
