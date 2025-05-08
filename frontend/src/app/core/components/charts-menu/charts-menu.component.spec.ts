import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsMenuComponent } from './charts-menu.component';

describe('ChartsMenuComponent', () => {
  let component: ChartsMenuComponent;
  let fixture: ComponentFixture<ChartsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
