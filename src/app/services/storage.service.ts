import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  get<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key));
  }

  set<T>(key: string, data: T) {
    localStorage.setItem(
      key,
      JSON.stringify(data)
    );
  }
}
