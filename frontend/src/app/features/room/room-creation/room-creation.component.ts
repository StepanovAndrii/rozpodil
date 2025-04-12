import { Component } from '@angular/core';
import { AccessControlService } from '../../../core/services/access-control-service/access-control.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-creation',
  imports: [],
  standalone: true,
  templateUrl: './room-creation.component.html',
  styleUrl: './room-creation.component.scss'
})

export class RoomCreationComponent {
  constructor(
    private accessControlService: AccessControlService,
    private router: Router
  ) { }

  public goToHome(): void {
    this.router.navigate(['/home'])
  }

  public changeToJoin() : void {
    this.accessControlService.enable();
    this.router.navigate(['/room/join'], { replaceUrl: true })
  }
}
