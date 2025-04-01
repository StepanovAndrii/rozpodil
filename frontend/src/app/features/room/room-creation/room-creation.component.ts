import { Component } from '@angular/core';
import { AccessControlService } from '../../../core/services/access-control-service/access-control.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-room-creation',
  imports: [RouterLink],
  templateUrl: './room-creation.component.html',
  styleUrl: './room-creation.component.scss'
})

export class RoomCreationComponent {
  constructor(
    private accessControlService: AccessControlService
  ) { }

  public allowAccess() : void {
    this.accessControlService.enable();
  }
}
