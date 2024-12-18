import { Directive, ElementRef, EventEmitter, HostListener, inject, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';


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
  spinner : NgxSpinnerService = inject(NgxSpinnerService)



  @Input() id: string = "";
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
    console.log(`Delete action for ID: ${this.id} on controller: ${this.controllerName}`);
  }

}