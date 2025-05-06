import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRoom } from '../../types/interfaces/room-interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dropdown-menu',
  imports: [NgClass],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss'
})

export class DropdownMenuComponent {
  @Input() options: IRoom[] = [];
  @Input() selectedOption: IRoom | null = null;
  @Output() selectedOptionChange = new EventEmitter<IRoom>();

  public isOpen: boolean = false; 

  constructor(
    
  ) { }

  public toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  public selectOption(option: IRoom) {
    this.selectedOption = option;
    this.selectedOptionChange.emit(option);
    this.toggleDropdown();
  }
}
