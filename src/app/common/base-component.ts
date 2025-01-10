import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from '../services/http.service';
import { CustomToastrService } from '../services/custom-toastr.service';
import { BaseResponse } from '../models/base/base-response';
import { firstValueFrom, Observable } from 'rxjs';

//Componentler için base class
export class BaseComponent {
  protected httpService: HttpService = inject(HttpService);
  protected tostr: CustomToastrService = inject(CustomToastrService);
  protected spinner: NgxSpinnerService = inject(NgxSpinnerService);

  constructor() {
  }

  async handleRequest<T>(obsData: Observable<T>, options: Partial<HandleRequestOptions<T>> = {}) {
    const { successMessage, errorMessage, onSuccess, onError} = options;
  
    this.spinner.show(); 
  
    try {
      const response = await firstValueFrom(obsData); // API'den gelen cevabı al
      if ((response as BaseResponse)?.succeed) {
        if (successMessage) this.tostr.showSuccess(successMessage);
        if (onSuccess) onSuccess(response); // Başarılı callback çalıştır
      } else {
        this.tostr.showError(errorMessage || (response as any)?.responseMessage || 'Hata oluştu.');
      }
    } catch (error) {

      this.tostr.showError(errorMessage || 'Beklenmedik bir hata oluştu.');
      if (onError) onError(error); // Hata callback çalıştır

    } finally {
       this.spinner.hide(); 
    }
  }

}

export interface HandleRequestOptions<T> {
  successMessage?: string; // Başarılı mesaj
  errorMessage?: string; // Hata mesajı
  onSuccess?: (response: T) => void; // Başarılı callback
  onError?: (error: any) => void; // Hata callback
}
