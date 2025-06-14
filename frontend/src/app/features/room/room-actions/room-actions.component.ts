import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IRoom } from '../../../core/types/interfaces/room-interface';

@Component({
  selector: 'app-room-actions',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './room-actions.component.html',
  styleUrl: './room-actions.component.scss'
})

export class RoomActionsComponent implements OnInit{
  constructor(
    private _route: ActivatedRoute,
    private _router: Router 
  ) { }

  ngOnInit(): void {
    let existingRoom: IRoom | null = null;
    
    this._route.data.subscribe({
      next: (data) => {
        existingRoom = data['room'];
        console.log(existingRoom);
        if (existingRoom) {
          this._router.navigate(['room', existingRoom.id])
        }
      }
    });
  }
}
