import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FirebaseApisService } from '../../services/firebase-apis.service';

// import models
import {
  Company,
  Project,
  Record,
  Task,
} from '../../models/firebase-entities.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  /**
   * company fields
   */
  company: Company;
  companies$: Observable<Company[]> = FirebaseApisService.getCompanies(
    (this.company || {}).title
  );
  companyTermChanged(value: string) {
    this.companies$ = FirebaseApisService.getCompanies(value);
  }
  companySelected(company: Company) {
    this.company = company;
    // update projects
    this.projects$ = FirebaseApisService.getProjects(
      (this.project || {}).name,
      (this.company || {}).id || 0
    );
  }

  /**
   * project fields
   */
  project: Project;
  projects$: Observable<Project[]> = FirebaseApisService.getProjects(
    (this.project || {}).name,
    (this.company || {}).id || 0
  );
  projectTermChanged(value: string) {
    this.projects$ = FirebaseApisService.getProjects(
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
  tasks$: Observable<Task[]> = FirebaseApisService.getTasks((this.task || {}).name);
  taskTermChanged(value: string) {
    this.tasks$ = FirebaseApisService.getTasks(value);
  }
  taskSelected(task: Task) {
    this.task = task;
  }

  ngOnInit(): void {}
}
