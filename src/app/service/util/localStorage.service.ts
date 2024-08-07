import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorage {
  public localStorage: any;

  constructor() {
    if (!localStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
    this.localStorage = localStorage;
  }

  public set(key: string, value: string): void {
    this.localStorage[key] = value;
  }

  public get(key: string): string {
    return this.localStorage[key] || false;
  }

  public setObject(key: string, value: any): void {
    this.localStorage[key] = JSON.stringify(value);
  }

  public getObject(key: string): any {
    if (!!this.localStorage[key] && this.localStorage[key] != 'undefined') {
      return JSON.parse(this.localStorage[key] || null);
    } else {
      return {};
    }
  }

  public remove(key: string): any {
    this.localStorage.removeItem(key);
  }

  public clear(): any {
    this.localStorage.clear();
  }

}
