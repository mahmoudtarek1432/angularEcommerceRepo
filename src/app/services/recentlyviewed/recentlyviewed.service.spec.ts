import { TestBed } from '@angular/core/testing';

import { RecentlyviewedService } from './recentlyviewed.service';

describe('RecentlyviewedService', () => {
  let service: RecentlyviewedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentlyviewedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
