import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaskButtonComponent } from './delete-task-button.component';

describe('DeleteTaskButtonComponent', () => {
  let component: DeleteTaskButtonComponent;
  let fixture: ComponentFixture<DeleteTaskButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTaskButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTaskButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
