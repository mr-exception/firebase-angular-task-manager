/**
 * this component is the login page with login inputs
 */
import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseApisService } from 'src/app/services/firebase-apis.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthGuardService } from '../../services/auth-guard.service';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private firebaseApi: FirebaseApisService
  ) {}

  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  /**
   * login to firebase with email && password inputs
   * prepared from component inputs
   */
  login() {
    this.firebaseApi
      .login(this.email.value, this.password.value)
      .subscribe((result: boolean) => {
        if (result) {
          // login progress done! fetch user email and show a toast
          this.snackBar.open(
            `hello ${this.firebaseApi.authInformation.email}`,
            null,
            {
              duration: 5000,
            }
          );
          this.router.navigate(['home']);
        } else {
          // login progress failed! show a failure toast
          this.snackBar.open('login failed!', null, { duration: 5000 });
        }
      });
  }

  // checkAuthInformations() {
  //   return new Promise<auth.UserCredential>(async (resolve, reject) => {
  //     try {
  //       const response = await this.firebaseApi.login(
  //         this.email.value,
  //         this.password.value
  //       );
  //       resolve(response);
  //     } catch (e) {
  //       reject();
  //     }
  //   });
  // }

  ngOnInit(): void {}
}
