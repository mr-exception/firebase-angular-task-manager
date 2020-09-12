/**
 * this components is containing the navbar and sidebar of home page.
 * in sidebar we have the user name and a button to toggle sidenav
 * in sidenav we have a button to logout
 */
import { Component, OnInit, Input } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Input() authGaurd: AuthGuardService;
  @Input() router: Router;
  public logout() {
    this.authGaurd.logout();
    this.router.navigate(['']);
  }

  ngOnInit(): void {}
}
