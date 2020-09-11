import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { RouterModule } from '@angular/router';
import { routes } from '../../app-routing.module';
import { HomeComponent } from './home.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [HomeComponent, AuthGuardService],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot(routes),
      ],
    }).compileComponents();
    component = TestBed.inject(HomeComponent);
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
