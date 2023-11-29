import { TestBed } from '@angular/core/testing';

import { ReviewDiscussionService } from './review-discussion.service';

describe('ReviewDiscussionService', () => {
  let service: ReviewDiscussionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewDiscussionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
