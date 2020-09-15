/**
 * this compopnent is a form to create a new record
 */
import { Component, OnInit } from '@angular/core';
import { FirebaseApisService } from 'src/app/services/firebase-apis.service';
import { Company, Project, Task } from 'src/app/models/firebase-entities.model';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-panel',
  templateUrl: './form-panel.component.html',
  styleUrls: ['./form-panel.component.scss'],
})
export class FormPanelComponent implements OnInit {
  constructor(
    public firebaseApi: FirebaseApisService,
    public snackBar: MatSnackBar
  ) {}
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
    this.companies$ = this.firebaseApi.getCompanies(company.title);
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
    this.projects$ = this.firebaseApi.getProjects(
      project.name,
      (this.company || {}).id || 0
    );
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
    this.tasks$ = this.firebaseApi.getTasks(task.name);
  }

  hours: FormControl = new FormControl('', [Validators.required]);

  submit() {
    if (!this.project)
      return this.snackBar.open(`please choose a project`, null, {
        duration: 5000,
      });
    if (!this.task)
      return this.snackBar.open(`please choose a task`, null, {
        duration: 5000,
      });
    if (!this.hours.valid)
      return this.snackBar.open(
        `please define the hours spent on this task`,
        null,
        {
          duration: 5000,
        }
      );
    this.firebaseApi.saveRecord({
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
