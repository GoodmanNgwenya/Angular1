import { TestBed } from '@angular/core/testing';

import { ItemEditGuard } from './item-edit.guard';

describe('ItemEditGuard', () => {
  let guard: ItemEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ItemEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
