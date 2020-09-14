/**
 * authgaurd is a class that implements the canActives() method
 * to use in routes. this guard also contains login and login methods
 * with holding informations from user to show in navbar component
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirebaseApisService } from './firebase-apis.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private angularAuth: AngularFireAuth,
    private firebaseApi: FirebaseApisService
  ) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.angularAuth.authState.pipe(
      map((user: firebase.User) => {
        if (!!user) {
          this.firebaseApi.authInformation = user;
          // user is logged-in
          if (route.data.needAuth) {
            return true;
          } else {
            // user is requesting a route with guest
            // permission while it's logged in
            this.router.navigate(['home']);
            return false;
          }
        } else {
          // user isn't logged-in
          if (route.data.needAuth) {
            // use it requesting a route with signed permission
            // while it's not logged in
            this.router.navigate(['']);
            return false;
          } else {
            return true;
          }
        }
      })
    );
  }
}
