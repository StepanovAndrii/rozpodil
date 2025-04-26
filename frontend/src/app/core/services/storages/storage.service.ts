import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class StorageService<T> {
  private value: T | null = null;
  
  constructor() { }

  protected setValue(value: T): void {
    this.value = value;
  }

  protected getValue(): T | null {
    return this.value;
  }

  protected clearValue(): void {
    this.value = null;
  }
}
