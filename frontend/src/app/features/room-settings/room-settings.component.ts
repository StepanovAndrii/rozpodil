import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-room-settings',
  imports: [],
  templateUrl: './room-settings.component.html',
  styleUrl: './room-settings.component.scss'
})
export class RoomSettingsComponent implements OnInit{

  constructor(
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.snapshot.paramMap.get('id');
  }
 
}
