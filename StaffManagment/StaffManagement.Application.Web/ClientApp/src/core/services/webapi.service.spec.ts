/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WebapiService } from './webapi.service';

describe('Service: Webapi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebapiService]
    });
  });

  it('should ...', inject([WebapiService], (service: WebapiService) => {
    expect(service).toBeTruthy();
  }));
});
