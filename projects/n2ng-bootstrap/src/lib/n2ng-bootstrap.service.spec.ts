import { TestBed } from '@angular/core/testing';

import { N2ngBootstrapService } from './n2ng-bootstrap.service';

describe('N2ngBootstrapService', () => {
  let service: N2ngBootstrapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(N2ngBootstrapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
