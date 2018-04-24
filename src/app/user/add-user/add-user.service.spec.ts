import { TestBed, inject } from '@angular/core/testing';

import { AddUserService } from './add-user.service';
import { HttpClientModule } from '@angular/common/http';

describe('AddUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddUserService],
      imports:[HttpClientModule]

    });
  });

  it('should be created', inject([AddUserService], (service: AddUserService) => {
    expect(service).toBeTruthy();
  }));
});
