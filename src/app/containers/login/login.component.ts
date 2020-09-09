import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseApisService } from 'src/app/services/firebase-apis.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthGuardService } from '../../services/auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private firebaseApi: FirebaseApisService;
  private authGaurd: AuthGuardService = new AuthGuardService(this.router);
  constructor(
    auth: AngularFireAuth,
    firestore: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.firebaseApi = new FirebaseApisService(auth, firestore);
  }

  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  async login() {
    try {
      const response = await this.firebaseApi.login(
        this.email.value,
        this.password.value
      );
      this.authGaurd.setUser(response.user);
      this.snackBar.open(`hello ${response.user.email}`, null, {
        duration: 5000,
      });
    } catch (e) {
      this.snackBar.open('login failed!', null, { duration: 5000 });
    }
  }

  ngOnInit(): void {}
}
