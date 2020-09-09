import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseApisService } from '../../services/firebase-apis.service';

// import models
import {
  Company,
  Project,
  Record,
  Task,
} from '../../models/firebase-entities.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public firebaseApi: FirebaseApisService;
  public drawerIsOpen = false;
  public logout() {
    this.authGaurd.logout();
    this.router.navigate(['']);
  }
  // private authGaurd: AuthGuardService = new AuthGuardService(this.router);

  constructor(
    auth: AngularFireAuth,
    firestore: AngularFirestore,
    public authGaurd: AuthGuardService,
    public router: Router
  ) {
    this.firebaseApi = new FirebaseApisService(auth, firestore);

    // fill default deta
    this.companies$ = this.firebaseApi.getCompanies((this.company || {}).title);
    this.projects$ = this.firebaseApi.getProjects(
      (this.project || {}).name,
      (this.company || {}).id || 0
    );
    this.tasks$ = this.firebaseApi.getTasks((this.task || {}).name);
    this.records$ = this.firebaseApi.getRecords();
  }

  /**
   * company fields
   */
  company: Company;
  companies$: Observable<Company[]>;
  companyTermChanged(value: string) {
    this.companies$ = this.firebaseApi.getCompanies(value);
  }
  companySelected(company: Company) {
    this.company = company;
    // update projects
    this.firebaseApi
      .getProjects((this.project || {}).name, (this.company || {}).id || 0)
      .subscribe((obs) => {
        console.log(obs);
      });
    this.projects$ = this.firebaseApi.getProjects(
      (this.project || {}).name,
      (this.company || {}).id || 0
    );
  }

  /**
   * project fields
   */
  project: Project;
  projects$: Observable<Project[]>;
  projectTermChanged(value: string) {
    this.projects$ = this.firebaseApi.getProjects(
      value,
      (this.company || {}).id || 0
    );
  }
  projectSelected(project: Project) {
    this.project = project;
  }

  /**
   * task fields
   */
  task: Task;
  tasks$: Observable<Task[]>;
  taskTermChanged(value: string) {
    this.tasks$ = this.firebaseApi.getTasks(value);
  }
  taskSelected(task: Task) {
    this.task = task;
  }

  hours: FormControl = new FormControl('', [Validators.required]);

  records$: Observable<Record[]>;
  records: Record[] = [];
  records_loading: string = 'loading';
  async submit() {
    await this.firebaseApi.saveRecord({
      projectId: this.project.id,
      taskId: this.task.id,
      hours: this.hours.value,
    });
  }
  ngOnInit() {
    this.records$.subscribe((records) => {
      console.log(records);
      this.records = records.map((record) => {
        return { ...record, project: { title: 'test' } };
      });
      this.records_loading = 'loaded';
    });
  }
}
