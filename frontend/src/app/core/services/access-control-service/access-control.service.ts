import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AccessControlService {
  private canAccess = false;

  constructor (
    private router: Router
  ) { }

  public enable(): void {
    this.canAccess = true;
  }

  public check(): boolean {
    if(!this.canAccess) {
      this.router.navigateByUrl('/');
    }
    return this.canAccess;
  }
}
