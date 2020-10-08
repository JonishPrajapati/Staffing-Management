/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DialogBoxService } from './dialog-box.service';

describe('Service: DialogBox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogBoxService]
    });
  });

  it('should ...', inject([DialogBoxService], (service: DialogBoxService) => {
    expect(service).toBeTruthy();
  }));
});
