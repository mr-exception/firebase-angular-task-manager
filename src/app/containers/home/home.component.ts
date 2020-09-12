/**
 * this component is the home page with a list of records
 */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseApisService } from '../../services/firebase-apis.service';

// import models
import { Record } from '../../models/firebase-entities.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public firebaseApi: FirebaseApisService;

  constructor(
    auth: AngularFireAuth,
    firestore: AngularFirestore,
    public authGaurd: AuthGuardService,
    public router: Router
  ) {
    this.firebaseApi = new FirebaseApisService(auth, firestore);
    this.records$ = this.firebaseApi.getRecords();
  }

  records$: Observable<Record[]>;
  ngOnInit() {}
}
