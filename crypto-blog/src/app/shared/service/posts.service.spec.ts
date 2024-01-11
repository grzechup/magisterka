import { TestBed } from '@angular/core/testing';

import { IpfsService } from 'src/app/shared/service/ipfs.service';

describe('PostsService', () => {
  let service: IpfsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpfsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
