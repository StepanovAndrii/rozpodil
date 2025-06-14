import {
  Injectable,
  signal
} from '@angular/core';

import { BaseToast } from './models/base-toast';
import { ToastFactory } from './factories/toast-factory';
import { ToastType } from './models/toast-types';

import {
  Subscription,
  timer
} from 'rxjs';
import { UUID } from 'crypto';

@Injectable({
  providedIn: 'root'
}) 

export class ToastService {
  private _toastsSignal = signal<BaseToast[]>([]);
  private _subscriptions = new Map<UUID, Subscription>();

  get toasts() {
    return this._toastsSignal.asReadonly();
  }

  public show(type: ToastType, message: string) {
    const toast = ToastFactory.createToast(type, message);
    this._toastsSignal.update((previousToasts) => [...previousToasts, toast]);
    timer(toast.getDuration()).subscribe(() => this.dismiss(toast.getId()));
  }

  public dismiss(id: UUID) {
    const subsctiption: Subscription | undefined = this._subscriptions.get(id);
    if (subsctiption) {
      subsctiption.unsubscribe();
      this._subscriptions.delete(id);
    }

    this._toastsSignal.update(
      (previousToasts) => previousToasts.filter(
        (toast) => toast.getId() !== id
      )
    );
  } 
}
