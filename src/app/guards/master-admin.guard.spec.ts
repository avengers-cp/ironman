import { TestBed, async, inject } from '@angular/core/testing';

import { MasterAdminGuard } from './master-admin.guard';

describe('MasterAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MasterAdminGuard]
    });
  });

  it('should ...', inject([MasterAdminGuard], (guard: MasterAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
