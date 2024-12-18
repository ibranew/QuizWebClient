import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from '../services/http.service';
import { CustomToastrService } from '../services/custom-toastr.service';

//Componentler için base class
export class BaseComponent {
  protected httpService: HttpService = inject(HttpService);
  protected tostr: CustomToastrService = inject(CustomToastrService);
  protected spinner: NgxSpinnerService = inject(NgxSpinnerService);

  constructor() {
  }
}