import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IUsersRoles } from '../../core/types/interfaces/users-roles';
import { InputFieldComponent } from "../../core/components/input-field/input-field.component";
import { IRoom } from '../../core/types/interfaces/room-interface';
import { CommonModule } from '@angular/common';
import { RoomRole } from '../../core/types/room-role-enum';
import { TokenService } from '../../core/services/authentication/token-service/token.service';
import { IUser } from '../../core/types/interfaces/user-interface';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-room-settings',
  imports: [InputFieldComponent, CommonModule],
  templateUrl: './room-settings.component.html',
  styleUrl: './room-settings.component.scss'
})

export class RoomSettingsComponent implements OnInit{
  public usersRoles: IUsersRoles[] | [] = [];
  public room: IRoom | null = null;
  public user: IUsersRoles | null = null;
  public roomRoleEnum = RoomRole;

  constructor(
    private _route: ActivatedRoute,
    public tokenService: TokenService,
    private _http: HttpClient
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe({
      next: (data) => {
        this.usersRoles = data['roomUsersRoles'];
        this.room = data['room'];
      }
    });
    this.user = this.getCurrentUser();
  }

  public canDeleteUser(targetRole?: RoomRole): boolean {
    
    if (this.user?.role === RoomRole.Owner) {
      return targetRole !== RoomRole.Owner;
    }

    if (this.user?.role === RoomRole.Admin) {
      return targetRole === RoomRole.Member;
    }

    return false;
  }

  public async deleteUserFromRoom(user: IUsersRoles) {
    await firstValueFrom (
      this._http.delete(`/api/rooms/${this.room?.id}/users/${user.id}`)
    );
  }

  private getCurrentUser(): IUsersRoles | null {
    const userId = this.tokenService.getUserId();
    return this.usersRoles.find(user => user.id === userId) ?? null;
  }
}
