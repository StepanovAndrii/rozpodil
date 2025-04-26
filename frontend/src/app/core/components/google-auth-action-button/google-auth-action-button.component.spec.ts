import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthActionButtonComponent } from './google-auth-action-button.component';

describe('GoogleAuthActionButtonComponent', () => {
  let component: GoogleAuthActionButtonComponent;
  let fixture: ComponentFixture<GoogleAuthActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleAuthActionButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleAuthActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
