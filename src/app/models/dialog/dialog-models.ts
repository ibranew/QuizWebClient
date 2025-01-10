import { ComponentType } from "@angular/cdk/portal";
import { BaseComponent } from "../../common/base-component";
import { DialogPosition } from "@angular/material/dialog";

export class DialogParameters {
    componentType : ComponentType<any> = BaseComponent;
    data?: DialogData;
    afterClosedConfirm?: () => void;
    afterClosed?: () => void;
    options?: Partial<DialogOptions> = new DialogOptions();
  }
  
  export class DialogOptions {
    width?: string = "450px";
    height?: string;
    position?: DialogPosition;
  }

  export class DialogData{
    message? : string ;
    dialogData? :any ; 
    confirm? : boolean;
  }