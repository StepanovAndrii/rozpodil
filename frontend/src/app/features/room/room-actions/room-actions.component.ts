import { Component } from '@angular/core';
import { AccessControlService } from '../../../core/services/access-control-service/access-control.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-room-actions',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './room-actions.component.html',
  styleUrl: './room-actions.component.scss'
})

export class RoomActionsComponent {
  constructor(
    private accessControlService: AccessControlService
  ) { }
  
  public allowAccess(): void {
    this.accessControlService.enable();
  }
}
