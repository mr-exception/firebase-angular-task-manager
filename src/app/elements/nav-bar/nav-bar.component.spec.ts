import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { environment } from '../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { routes } from '../../app-routing.module';
import { RouterModule } from '@angular/router';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      providers: [NavBarComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot(routes),
      ],
    }).compileComponents();
    component = TestBed.inject(NavBarComponent);
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
