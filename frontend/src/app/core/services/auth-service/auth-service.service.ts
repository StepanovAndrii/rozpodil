import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
 constructor(
  private _http: HttpClient
 ) { }

 public registerWithForm(formGroup: FormGroup): void {
  if (formGroup.valid) {
    const { passwordRepetition, ...dataToSend } = formGroup.value;
    this._http.post('/api/register', dataToSend);
  }
 }
}
