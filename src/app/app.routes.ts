import { Routes } from '@angular/router';
import { LoginComponent } from './ui/login/login.component';
import { RegisterComponent } from './ui/register/register.component';
import { guestGuard } from './guards/common/guest.guard';
import { DashboardComponent } from './ui/quiz/dashboard/dashboard.component';
import { authGuard } from './guards/common/auth.guard';

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [guestGuard] // Guard burada devreye girer.
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [guestGuard] // Guard burada devreye girer.
  },
  {
   path: "quiz",
   component: DashboardComponent,
   canActivate: [authGuard] // Guard burada devreye girer.
  }
];
