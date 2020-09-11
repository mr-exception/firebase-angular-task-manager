import { async, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      providers: [NotFoundComponent],
    }).compileComponents();
    component = TestBed.inject(NotFoundComponent);
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
