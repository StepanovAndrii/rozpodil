import { Component } from '@angular/core';
import { AccessControlService } from '../../../core/services/access-control-service/access-control.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-room-joining',
  imports: [RouterLink],
  templateUrl: './room-joining.component.html',
  styleUrl: './room-joining.component.scss'
})
export class RoomJoiningComponent {
  constructor(
    private accessControlService: AccessControlService
  ) { }

  public allowAccess() : void {
    this.accessControlService.enable();
  }
}
