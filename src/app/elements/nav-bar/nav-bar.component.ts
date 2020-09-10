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
