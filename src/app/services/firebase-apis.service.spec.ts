import { TestBed } from '@angular/core/testing';

import { FirebaseApisService } from './firebase-apis.service';

describe('FirebaseApisService', () => {
  let service: FirebaseApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
