import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './containers/login/login.component';
import { HomeComponent } from './containers/home/home.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuardService],
    data: { needAuth: false },
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    data: { needAuth: true },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
