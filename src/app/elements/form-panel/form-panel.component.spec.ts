import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { FormPanelComponent } from './form-panel.component';
import { AngularFireModule } from '@angular/fire';

describe('FormPanelComponent', () => {
  let component: FormPanelComponent;
  let fixture: ComponentFixture<FormPanelComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormPanelComponent],
      providers: [FormPanelComponent],
      imports: [AngularFireModule.initializeApp(environment.firebase)],
    }).compileComponents();
    component = TestBed.inject(FormPanelComponent);
  }));
  it('should create', () => {
    // component = TestBed.get
    expect(component).toBeTruthy();
  });
});
