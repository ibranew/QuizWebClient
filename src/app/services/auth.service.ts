import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { CustomToastrService } from './custom-toastr.service';
import { HttpService } from './http.service';
import { LoginResponse } from '../models/login-response';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

interface LoginData {
  userName: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private spinner = inject(NgxSpinnerService);
  private toastr = inject(CustomToastrService);
  private httpService = inject(HttpService);
  private router = inject(Router);
  private jwtHelper = inject(JwtHelperService);

  private _isLoggedIn = new BehaviorSubject<boolean>(this.checkToken()); // İlk kontrol yapılır
  isLoggedIn$ = this._isLoggedIn.asObservable(); // Public observable

  // Giriş durumunu reaktif şekilde kontrol et
  private checkToken(): boolean {
    const token = localStorage.getItem('accessWebToken');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  // Auth durumunu manuel kontrol etmek için kullanılabilir
  authCheck(): void {
    this._isLoggedIn.next(this.checkToken());
  }
  // Kullanıcı girişi
  async login(userName: string, password: string): Promise<void> {
    this.spinner.show();
    const request: LoginData = { userName, password };

    try {
      const observableData = this.httpService.post<LoginResponse>(
        {
          controller: 'Auth',
          action: 'login',
        },
        request as any
      );

      const data: LoginResponse = await firstValueFrom(observableData);

      if (data?.succeed) {
        this.toastr.showSuccess(data.responseMessage);
        localStorage.setItem('accessWebToken', data.token?.accessToken || '');
        this._isLoggedIn.next(true); // Oturum açıldı
        this.router.navigate(['/']); // Ana sayfaya yönlendir
      } else {
        this.toastr.showError(data.responseMessage);
      }
    } catch (error) {
      console.error('Login failed:', error);
      this.toastr.showError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      this.spinner.hide();
    }
  }
  // Çıkış
  logout(): void {
    localStorage.removeItem('accessWebToken');
    this._isLoggedIn.next(false); // Oturum kapatıldı
    this.router.navigate(['/login']); // Login sayfasına yönlendir
  }
}
