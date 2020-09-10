import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FirebaseApisService } from 'src/app/services/firebase-apis.service';
import { Company, Project, Task } from 'src/app/models/firebase-entities.model';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-form-panel',
  templateUrl: './form-panel.component.html',
  styleUrls: ['./form-panel.component.scss'],
})
export class FormPanelComponent implements OnInit {
  public firebaseApi: FirebaseApisService;
  constructor(auth: AngularFireAuth, firestore: AngularFirestore) {
    this.firebaseApi = new FirebaseApisService(auth, firestore);
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

  async submit() {
    await this.firebaseApi.saveRecord({
      projectId: this.project.id,
      taskId: this.task.id,
      hours: this.hours.value,
    });
  }
  ngOnInit(): void {
    // fill default deta
    this.companies$ = this.firebaseApi.getCompanies((this.company || {}).title);
    this.projects$ = this.firebaseApi.getProjects(
      (this.project || {}).name,
      (this.company || {}).id || 0
    );
    this.tasks$ = this.firebaseApi.getTasks((this.task || {}).name);
  }
}
