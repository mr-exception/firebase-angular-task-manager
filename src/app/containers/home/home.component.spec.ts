import { async, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';
import { routes } from '../../app-routing.module';
import { HomeComponent } from './home.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { MatDialogModule } from '@angular/material/dialog';

describe('HomeComponent', () => {
  let component: HomeComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [HomeComponent, AuthGuardService],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot(routes),
        MatDialogModule,
      ],
    }).compileComponents();
    component = TestBed.inject(HomeComponent);
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
