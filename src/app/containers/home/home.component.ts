/**
 * this component is the home page with a list of records
 */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseApisService } from '../../services/firebase-apis.service';

// import models
import { Record } from '../../models/firebase-entities.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public firebaseApi: FirebaseApisService) {
    this.firebaseApi.getRecords().subscribe((obs) => {
      console.log(obs);
    });
  }

  records$: Observable<Record[]> = this.firebaseApi.getRecords();
  ngOnInit() {}
}
