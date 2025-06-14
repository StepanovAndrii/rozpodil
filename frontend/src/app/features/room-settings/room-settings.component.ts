import { Component, OnInit } from '@angular/core';
import { InputFieldComponent } from "../../core/components/input-field/input-field.component";
import { CommonModule } from '@angular/common';
import { PaddingComponent } from "../../core/components/padding/padding.component";

@Component({
  selector: 'app-room-settings',
  imports: [CommonModule, PaddingComponent],
  templateUrl: './room-settings.component.html',
  styleUrl: './room-settings.component.scss'
})

export class RoomSettingsComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
}
