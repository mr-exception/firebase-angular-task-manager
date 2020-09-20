/**
 * this component is the home page with a list of records
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseApisService } from '../../services/firebase-apis.service';

// import models
import { Record } from '../../models/firebase-entities.model';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public firebaseApi: FirebaseApisService) {}

  records$: Observable<Record[]> = this.firebaseApi.getRecords();
  sortData(event: Sort) {
    this.records$ = this.firebaseApi.getRecords(event);
  }
  ngOnInit() {}
}
