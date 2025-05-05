import { Component, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-setting-button',
  imports: [],
  templateUrl: './setting-button.component.html',
  styleUrl: './setting-button.component.scss'
})

export class SettingButtonComponent {
  @Output() clickAction = new EventEmitter<void>();

  public onCkick() {
    this.clickAction.emit();
  }
}
