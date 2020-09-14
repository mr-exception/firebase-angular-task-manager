/**
 * authgaurd is a class that implements the canActives() method
 * to use in routes. this guard also contains login and login methods
 * with holding informations from user to show in navbar component
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, first } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private angularAuth: AngularFireAuth) {
    this.angularAuth.authState.subscribe((obs) => {
      this.userInformation = obs;
    });
  }
  private userInformation: firebase.User = null;
  canActivate(): boolean {
    if (this.userInformation !== null) return true;
    this.router.navigate(['']);
    return false;
  }

  logout() {
    this.angularAuth.signOut();
  }

  getEmail(): string {
    if (this.userInformation) this.userInformation.email;
    else return '';
  }
}
