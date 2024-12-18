import { Component, inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService } from '../../services/custom-toastr.service';
import { BaseResponse } from '../../models/base/base-response';
import { BaseComponent } from '../../common/base-component';


export interface UserDTO {
  userName: string;
  name: string;
  surName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends BaseComponent {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder) {
    super();
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', Validators.required],
    });
  }

  async onSubmit(){
    this.spinner.show();
    
    if (this.registerForm.valid) {
      
      const user : UserDTO = this.registerForm.value;
      
      const Obsdata = this.httpService.post({
        controller : "users",
        action :"user-register"
      },{user} as any);

      let data : BaseResponse = {succeed : false, responseMessage : ""};
      try {
       data = await firstValueFrom(Obsdata) as BaseResponse;        
      } catch (error) {
        this.tostr.showError("Kaydolma işlemi başarısız");
      }
      if(data?.succeed){
        this.tostr.showSuccess(data.responseMessage)
      }
      else{
        this.tostr.showError(data.responseMessage);
        alert(data.responseMessage)
      }
      this.spinner.hide();
    }
  }


  // showValidationErrors(): void {
  //   Object.keys(this.registerForm.controls).forEach((key) => {
  //     const control = this.registerForm.get(key);
  //     if (control?.invalid) {
  //       let message = '';

  //       switch (key) {
  //         case 'name':
  //           message = 'Ad gerekli!';
  //           break;
  //         case 'surName':
  //           message = 'Soyad gerekli!';
  //           break;
  //         case 'userName':
  //           message = 'Kullanıcı adı gerekli!';
  //           break;
  //         case 'email':
  //           message = 'Geçerli bir e-posta girin!';
  //           break;
  //         case 'password':
  //           message = 'Şifre gerekli!';
  //           break;
  //         case 'confirmPassword':
  //           message = 'Şifreyi onaylayın!';
  //           break;
  //         default:
  //           message = 'Hata oluştu.';
  //       }

  //       this.snackBar.open(message, 'Kapat', {
  //         duration: 3000,
  //         verticalPosition: 'top', // Mesajın ekranın üstünde görünmesi için
  //       });
  //     }
  //   });
  // }
}
