import { TestBed } from '@angular/core/testing';

import { ChuckNorrisService } from './chuckNorris.service';

describe('DataService', () => {
  let service: ChuckNorrisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChuckNorrisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
