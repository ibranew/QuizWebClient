import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  toastr: ToastrService = inject(ToastrService);

  /**
   * Başarı mesajını sol üst köşede gösterir.
   * @param message - Gösterilecek mesaj.
   */
  showSuccess(message: string) {
    this.toastr.success(message, "Başarılı", {
      positionClass: 'toast-top-left'
    });
  }

  /**
   * Hata mesajını sol üst köşede gösterir.
   * @param message - Gösterilecek mesaj.
   */
  showError(message: string) {
    this.toastr.error(message, "Hata", {
      positionClass: 'toast-top-left'
    });
  }

  /**
   * Bilgi mesajını sol üst köşede gösterir.
   * @param message - Gösterilecek mesaj.
   */
  showInfo(message: string) {
    this.toastr.info(message, "Bilgi", {
      positionClass: 'toast-top-left'
    });
  }

  /**
   * Uyarı mesajını sol üst köşede gösterir.
   * @param message - Gösterilecek mesaj.
   */
  showWarning(message: string) {
    this.toastr.warning(message, "Uyarı", {
      positionClass: 'toast-top-left'
    });
  }
}