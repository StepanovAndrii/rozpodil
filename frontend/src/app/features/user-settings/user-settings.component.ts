import { Component, OnInit } from '@angular/core';
import { PaddingComponent } from "../../core/components/padding/padding.component";
import { InputFieldComponent } from "../../core/components/input-field/input-field.component";
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../core/types/interfaces/user-interface';

@Component({
  selector: 'app-user-settings',
  imports: [PaddingComponent, InputFieldComponent],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss'
})
export class UserSettingsComponent implements OnInit{
  public user: IUser | null = null;
  
  constructor (
    private _route: ActivatedRoute
  ) { }
  
  public ngOnInit(): void {
    this._route.data.subscribe(data => {
      this.user = data['user'];
    });
  }
}
