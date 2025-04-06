import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleEyeComponent } from './toggle-eye.component';

describe('ToggleEyeComponent', () => {
  let component: ToggleEyeComponent;
  let fixture: ComponentFixture<ToggleEyeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleEyeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleEyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
