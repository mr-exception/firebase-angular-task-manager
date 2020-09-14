/**
 * this components is containing the navbar and sidebar of home page.
 * in sidebar we have the user name and a button to toggle sidenav
 * in sidenav we have a button to logout
 */
import { Component, OnInit, Input } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Router } from '@angular/router';
import { FirebaseApisService } from 'src/app/services/firebase-apis.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Input() authGaurd: AuthGuardService;
  @Input() router: Router;
  constructor(public firebaseApi: FirebaseApisService) {}
  public logout() {
    this.firebaseApi.logout();
    this.router.navigate(['']);
  }

  ngOnInit(): void {}
}
