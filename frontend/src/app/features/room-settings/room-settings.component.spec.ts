import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSettingsComponent } from './room-settings.component';

describe('RoomSettingsComponent', () => {
  let component: RoomSettingsComponent;
  let fixture: ComponentFixture<RoomSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
