import { TestBed } from '@angular/core/testing';
import { ExpenseInterface } from 'src/app/interfaces/ExpenseInterface';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should Add All the Expenses', () => {
    const expectedTotal = 13;
    const mockExpenses: ExpenseInterface[] = [
      {
        amount: 5,
        type: 'Games',
        createdOn: new Date(),
        description: 'This the description'
      },
      {
        amount: 8,
        type: 'Games',
        createdOn: new Date(),
        description: 'This the second description'
      }
    ]

    const service: DataService = TestBed.inject(DataService);
    const actualTotal = service.calculateTodayTotal(mockExpenses);
    expect(actualTotal).toEqual(expectedTotal);
  });
});
