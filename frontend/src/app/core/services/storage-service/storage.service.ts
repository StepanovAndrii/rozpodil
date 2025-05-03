import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService<T> {
  private storage: {[key: string]: any} = {};

  constructor() { }

  public setItem<T>(key: string, value: T): void {
    this.storage[key] = value;
  }

  public getItem<T>(key: string): T | null {
    return this.storage[key] || null;
  }

  public clearItem(key: string): void {
    delete this.storage[key];
  }

  public clearAll(): void {
    this.storage = {};
  }
}
