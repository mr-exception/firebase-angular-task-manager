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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private firebaseApi: FirebaseApisService;
  constructor(public auth: AngularFireAuth) {
    this.firebaseApi = new FirebaseApisService(auth);

    // fill default deta
    this.companies$ = this.firebaseApi.getCompanies((this.company || {}).title);
    this.projects$ = this.firebaseApi.getProjects(
      (this.project || {}).name,
      (this.company || {}).id || 0
    );
    this.tasks$ = this.firebaseApi.getTasks((this.task || {}).name);
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

  ngOnInit(): void {}
}
