import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: "dashboard",
    pathMatch: 'prefix'
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: '**',
    redirectTo: "dashboard"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
