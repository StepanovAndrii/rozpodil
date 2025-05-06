import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRoom } from '../../types/interfaces/room-interface';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropdown-menu',
  imports: [NgClass],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss'
})

export class DropdownMenuComponent implements OnInit{
  @Input() options: IRoom[] = [];
  @Output() selectedOptionChange = new EventEmitter<IRoom>();
  public selectedOption: IRoom | null = null;
  public isOpen: boolean = false; 

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  ngOnInit(): void {
    // this.selectedOption = this.options.filter(option => option.id);
    // if (this.selectedOption) {
    //   this.selectedOptionChange.emit(this.selectedOption);
    // }
  }

  public toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  public selectOption(option: IRoom) {
    this.selectedOption = option;
    this.selectedOptionChange.emit(option);
    this.toggleDropdown();
    this._router.navigate(['/room', option.id])
  }
}
