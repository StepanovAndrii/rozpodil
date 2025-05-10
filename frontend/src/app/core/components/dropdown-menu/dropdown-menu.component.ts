import { Component, Input, input, InputSignal, output, Signal } from '@angular/core';
import { DropdownOption } from './types/dropdown-option';

@Component({
  selector: 'app-dropdown-menu',
  imports: [],
  standalone: true,
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss'
})

export class DropdownMenuComponent<T extends DropdownOption> {
  public options = input.required<T[]>()
  @Input() public selectedOptionValue!: T | null;
  public selectedOption = output<T>();

  public isDropdownOpened: boolean = false; 

  constructor( ) { }

  public toggle(): void {
    this.isDropdownOpened = !this.isDropdownOpened;
  }

  public selectOption(option: T): void {
    this.toggle();
    this.selectedOption.emit(option);
    this.selectedOptionValue = option;
  }
}
