// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

let is_logged_in = false;
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    if (!is_logged_in) this.router.navigate(['']);
    else return true;
  }

  setUser(user) {
    is_logged_in = true;
    this.router.navigate(['home']);
  }
}
