/**
 * authgaurd is a class that implements the canActives() method
 * to use in routes. this guard also contains login and login methods
 * with holding informations from user to show in navbar component
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

let is_logged_in: boolean = false;
let email: string;
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    if (!is_logged_in) this.router.navigate(['']);
    else return true;
  }

  setUser(user: firebase.User) {
    is_logged_in = true;
    email = user.email;
    this.router.navigate(['home']);
  }
  logout() {
    is_logged_in = false;
    email = null;
  }

  getEmail(): string {
    return email;
  }
}
