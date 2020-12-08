import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          StorageService
      ]
    });
    service = TestBed.inject(StorageService);
  });

  it('Storage Service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('saveToLocalStorage() | getFromLocalStorage() | Test Cases', (doneFn) => {
    const object = {test: 'Changed Value'};
    const actual = service.saveToLocalStorage('test', object);
    const expected = service.getFromLocalStorage('test').then((val)  => {
      expect(val).toEqual(object);
      doneFn();
    });
  });

  it('removeFromLocalStorage() | Should remove key from Local Storage', (doneFn) => {
    const object = {test: 'Test'};
    const actual = service.saveToLocalStorage('test', object);
    service.getFromLocalStorage('test').then(value => {
      console.log('Stored in local', value);
    });
    service.removeFromLocalStorage('test').then((val: void) => {
      expect(val).toBe(undefined);
      doneFn();
    });
  });

  it('clearLocalStorage() | Should Clear everything from local storage', (doneFn) => {
    const object = {test: 'Test'};
    const actual = service.saveToLocalStorage('test', object);
    service.getFromLocalStorage('test').then(value => {
      console.log('Stored in local', value);
    });
    service.clearLocalStorage().then(value => {
      expect(value).toBe(undefined);
      doneFn();
    });
  });
});
