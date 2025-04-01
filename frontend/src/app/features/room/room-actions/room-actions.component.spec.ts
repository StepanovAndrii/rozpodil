import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomActionsComponent } from './room-actions.component';

describe('RoomActionsComponent', () => {
  let component: RoomActionsComponent;
  let fixture: ComponentFixture<RoomActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
