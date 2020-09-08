import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseApisService } from 'src/app/services/firebase-apis.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private firebaseApi: FirebaseApisService;
  constructor(public auth: AngularFireAuth, private snackBar: MatSnackBar) {
    this.firebaseApi = new FirebaseApisService(auth);
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
      console.log(response);
      this.snackBar.open('login was successful', null, { duration: 5000 });
    } catch (e) {
      this.snackBar.open('login failed!', null, { duration: 5000 });
    }
  }

  ngOnInit(): void {}
}
