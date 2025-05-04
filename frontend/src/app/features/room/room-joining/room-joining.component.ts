import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-joining',
  imports: [],
  standalone: true,
  templateUrl: './room-joining.component.html',
  styleUrl: './room-joining.component.scss'
})
export class RoomJoiningComponent {
  constructor(
    private router: Router
  ) { }

  public changeToCreate() : void {
    this.router.navigate(['/room/create'], { replaceUrl: true })
  }
}
