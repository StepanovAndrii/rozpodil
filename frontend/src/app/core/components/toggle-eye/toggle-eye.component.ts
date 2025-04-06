import {
  Component,
  ElementRef,
  ViewChild 
} from '@angular/core';

@Component({
  selector: 'app-toggle-eye',
  imports: [],
  templateUrl: './toggle-eye.component.html',
  styleUrl: './toggle-eye.component.scss'
})

export class ToggleEyeComponent {
  @ViewChild('toggleEyeButton') toggleEyeButton!: ElementRef<HTMLButtonElement>

  public toggle(): void {
    if(this.isPasswordInvisible) {
      this.isPasswordInvisible = false;
      this.passwordInput.nativeElement.type = 'text';
      this.togglePasswordButton.nativeElement.classList.remove('opened-eye');
      this.togglePasswordButton.nativeElement.classList.add('closed-eye');
      return;
    }
    this.isPasswordInvisible = true;
    this.passwordInput.nativeElement.type = 'password';
    this.togglePasswordButton.nativeElement.classList.remove('closed-eye');
    this.togglePasswordButton.nativeElement.classList.add('opened-eye');
  }
}
