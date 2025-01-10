import { Directive, ElementRef, EventEmitter, HostListener, inject, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService } from '../services/dialog.service';
import { BasicDialogComponent } from '../common/dialogs/basic-dialog/basic-dialog.component';
import { firstValueFrom } from 'rxjs';
import { BaseResponse } from '../models/base/base-response';
import { CustomToastrService } from '../services/custom-toastr.service';


interface StandaloneDirective extends Directive {
  imports?: any[];
}

@Directive({
  selector: '[appDelete]',
  standalone: true,
  imports: [MatIconModule]
} as StandaloneDirective)
export class DeleteDirective implements OnInit {

  private iconUrl : string = "/SVG/delete.svg";

  httpService : HttpService = inject(HttpService);
  spinner : NgxSpinnerService = inject(NgxSpinnerService);
  toastr : CustomToastrService = inject(CustomToastrService);
  dialogService : DialogService = inject(DialogService);


  @Input() id: string = "";
  @Input() message: string = "";
  @Input() controllerName: string ="";
  @Output() callback: EventEmitter<any> = new EventEmitter();// after

  constructor(
    private el: ElementRef,
    private _renderer: Renderer2,) {}

    ngOnInit() {
     // Yeni bir img elementi oluşturuyoruz
    const icon = this._renderer.createElement('img');
    this._renderer.setAttribute(icon, 'src', this.iconUrl); // iconUrl'dan SVG dosyasının yolunu alıyoruz
    this._renderer.setAttribute(icon, 'alt', 'delete icon'); // Görselin açıklama metni
    this._renderer.setStyle(icon, 'cursor', 'pointer'); // İkonun tıklanabilir olduğunu belirliyoruz
    this._renderer.setStyle(icon, 'width', '24px'); // Genişlik ayarı (isteğe bağlı)
    this._renderer.setStyle(icon, 'height', '24px'); // Yükseklik ayarı (isteğe bağlı)
    this._renderer.appendChild(this.el.nativeElement, icon); // İkonu directive uygulanan elemanın içine ekliyoruz
    }

  @HostListener('click')
  onClick() {
  
    if (!this.message || this.message.trim() === "") {
      this.message = "Bu işlemi onaylıyor musunuz.";
    }
    this.dialogService.openDialog({
      componentType : BasicDialogComponent,
      data : {message : this.message, confirm : false},
      afterClosedConfirm : async ()=>{
        //silme işlemi eğer onaylanırsa
        const obsData  = await this.httpService.delete({
          controller : this.controllerName
        },this.id);

        let response : BaseResponse = {responseMessage : "Hata" , succeed : false};
        this.spinner.show();
        try {
          response  =  await firstValueFrom(obsData) as BaseResponse
        } catch (error) {
          console.log(error);
        }
        finally{
          this.spinner.hide();
        }
        if(response.succeed){
          this.callback.emit();
          this.toastr.showSuccess("Silme işlemi başarılı");
        }else{
          this.toastr.showError("Bir hata ile karşılaşıldı");
        }        
        debugger;
        
      },
      options : {
        width : "350px",
      }
    });
  }

}