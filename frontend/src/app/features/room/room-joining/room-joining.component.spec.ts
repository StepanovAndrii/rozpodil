import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomJoiningComponent } from './room-joining.component';

describe('RoomJoiningComponent', () => {
  let component: RoomJoiningComponent;
  let fixture: ComponentFixture<RoomJoiningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomJoiningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomJoiningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
