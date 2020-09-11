import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      providers: [NavBarComponent],
    }).compileComponents();
    component = TestBed.inject(NavBarComponent);
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
