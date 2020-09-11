import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { FormPanelComponent } from './form-panel.component';
import { AngularFireModule } from '@angular/fire';

describe('FormPanelComponent', () => {
  let component: FormPanelComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormPanelComponent],
      providers: [FormPanelComponent],
      imports: [AngularFireModule.initializeApp(environment.firebase)],
    }).compileComponents();
    component = TestBed.inject(FormPanelComponent);
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should company term change', (done) => {
    component.companyTermChanged('');
    done();
  });
  it('should company selected', (done) => {
    component.firebaseApi.getCompanies('').subscribe((companies) => {
      component.companySelected(companies[0]);
      done();
    });
  });
  it('should project term change', (done) => {
    component.projectTermChanged('');
    done();
  });
  it('should project selected', (done) => {
    component.firebaseApi.getProjects('', 0).subscribe((projects) => {
      component.projectSelected(projects[0]);
      done();
    });
  });
  it('should task term change', (done) => {
    component.taskTermChanged('');
    done();
  });
  it('should task selected', (done) => {
    component.firebaseApi.getTasks('').subscribe((tasks) => {
      component.taskSelected(tasks[0]);
      done();
    });
  });
});
