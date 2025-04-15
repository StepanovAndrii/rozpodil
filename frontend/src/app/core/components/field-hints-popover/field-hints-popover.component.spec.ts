import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldHintsPopoverComponent } from './field-hints-popover.component';

describe('FieldHintsPopoverComponent', () => {
  let component: FieldHintsPopoverComponent;
  let fixture: ComponentFixture<FieldHintsPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldHintsPopoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldHintsPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
