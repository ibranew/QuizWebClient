import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const isLoggedIn = await firstValueFrom(authService.isLoggedIn$);
  
  if (!isLoggedIn) {
    router.navigate(['login']); // Ana sayfa veya başka bir rota
    return false;
  }
  return true;
};
