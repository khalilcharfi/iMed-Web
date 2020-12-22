import { TestBed } from '@angular/core/testing';

import { NotAuthGuardGuard } from './not-auth-guard.guard';

describe('NotAuthGuardGuard', () => {
  let guard: NotAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
