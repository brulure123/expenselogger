import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async saveToLocalStorage(key: string, value: any) {
    await Plugins.Storage.set({
      key,
      value: JSON.stringify(value)
    });
  }

  async getFromLocalStorage(key: string): Promise<any> {
    const ret = await Plugins.Storage.get({key});
    return JSON.parse(ret.value);
  }

  async removeFromLocalStorage(key: string): Promise<void> {
    return await Plugins.Storage.remove({ key });
  }

  async clearLocalStorage(): Promise<void> {
    return await Plugins.Storage.clear();
  }
}
