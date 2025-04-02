import { Component } from '@angular/core';
import { AccessControlService } from '../../../core/services/access-control-service/access-control.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-joining',
  imports: [],
  templateUrl: './room-joining.component.html',
  styleUrl: './room-joining.component.scss'
})
export class RoomJoiningComponent {
  constructor(
    private accessControlService: AccessControlService,
    private router: Router
  ) { }

  public changeToCreate() : void {
    this.accessControlService.enable();
this.router.navigate(['/room/create'], { replaceUrl: true })
  }
}
