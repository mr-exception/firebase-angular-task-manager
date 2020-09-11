import { async, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { RouterModule } from '@angular/router';
import { routes } from '../../app-routing.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [LoginComponent, MatSnackBar],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        OverlayModule,
        MatSnackBarModule,
        RouterModule.forRoot(routes),
      ],
    }).compileComponents();
    component = TestBed.inject(LoginComponent);
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
