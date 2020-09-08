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
  company: FormControl = new FormControl('');
  companies$: Observable<Company[]>;
  companyTermChanged() {
    console.log(this.company.value);
    this.companies$ = FirebaseApisService.getCompanies(this.company.value);
  }
  ngOnInit(): void {}
}
