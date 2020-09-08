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
  company_search: FormControl = new FormControl('');
  company: Company;
  companies$: Observable<Company[]> = FirebaseApisService.getCompanies(
    this.company_search.value
  );
  companyTermChanged() {
    this.companies$ = FirebaseApisService.getCompanies(
      this.company_search.value
    );
  }

  /**
   * project fields
   */
  project_search: FormControl = new FormControl('');
  projects$: Observable<Project[]> = FirebaseApisService.getProjects(
    this.project_search.value,
    0
  );
  projectTermChanged() {
    this.companies$.subscribe((obs) => {

    });
    this.projects$ = FirebaseApisService.getProjects(
      this.project_search.value,
      0
    );
  }

  ngOnInit(): void {}
}
