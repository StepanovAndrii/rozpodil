import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendCodeButtonComponent } from './resend-code-button.component';

describe('ResendCodeButtonComponent', () => {
  let component: ResendCodeButtonComponent;
  let fixture: ComponentFixture<ResendCodeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResendCodeButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResendCodeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
