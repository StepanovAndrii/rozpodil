import { Component, Input } from '@angular/core';
import { ToggleEyeComponent } from "../toggle-eye/toggle-eye.component";
import { InputFieldComponent } from '../input-field/input-field.component';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [
    ToggleEyeComponent,
    InputFieldComponent
  ],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.scss'
})
export class PasswordFieldComponent {
  @Input() inputFieldId!: string;

  public isPasswordVisible: boolean = false;

  public togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  public preventShortcutIfInvisible(event: KeyboardEvent): void {
    const blockedKeys = ['c', 'x'];
    
    if(!this.isPasswordVisible){
      if(event.metaKey &&
        blockedKeys.includes(event.key.toLowerCase())) 
      {
        event.preventDefault();
      }
    }
  }
}
