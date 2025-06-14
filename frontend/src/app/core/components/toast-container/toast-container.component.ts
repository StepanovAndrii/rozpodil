import {
  Component,
  inject,
  Signal
} from '@angular/core';

import { ToastService } from '../../services/toast-service/toast.service';
import { CommonModule } from '@angular/common';
import { BaseToast } from '../../services/toast-service/models/base-toast';
import { UUID } from 'crypto';
import { ToastType } from '../../services/toast-service/models/toast-types';

@Component({
  selector: 'app-toast-container',
  imports: [CommonModule],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss'
})

export class ToastContainerComponent {
  public toasts: Signal<BaseToast[]>;
  public toastType: typeof ToastType = ToastType;
  
  constructor(
    private _toastService: ToastService
  ) {
    this.toasts = _toastService.toasts;
  }

  public dismissMessage(id: UUID): void {
    this._toastService.dismiss(id);
  }
}
