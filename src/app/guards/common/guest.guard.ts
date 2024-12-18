import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const guestGuard: CanActivateFn = (route, state) => {
 
    const jwtHelper: JwtHelperService = inject(JwtHelperService); 
    const router: Router = inject(Router);
  
    const token: string | null = localStorage.getItem("accessWebToken");
  
    // Eğer token varsa ve geçerliyse, kullanıcıyı ana sayfaya yönlendir
    if (token && !jwtHelper.isTokenExpired(token)) {
      router.navigate(['/']); // Ana sayfa veya başka bir rota
      return false; // Geçişe izin verme
    }
  
    // Token yoksa veya geçersizse geçişe izin ver
    return true;
};