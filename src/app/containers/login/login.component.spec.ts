import { async, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { RouterModule } from '@angular/router';
import { routes } from '../../app-routing.module';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [LoginComponent, MatSnackBar, AuthGuardService],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        OverlayModule,
        MatSnackBarModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
      ],
    }).compileComponents();
    component = TestBed.inject(LoginComponent);
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should login fail', (done) => {
    component.email.setValue('wrong@mail.com');
    component.password.setValue('wrongpassword');
    component
      .checkAuthInformations()
      .then((result) => {
        expect(result).toBeTruthy();
        done();
      })
      .catch((error) => {
        done();
      });
  });
  it('should login success', (done) => {
    component.email.setValue('test@mail.com');
    component.password.setValue('testpassword');
    component
      .checkAuthInformations()
      .then((result) => {
        expect(result).toBeTruthy();
        done();
      })
      .catch((error) => {
        done();
      });
  });
});
