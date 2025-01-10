import { inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BaseComponent } from "../base-component";

export class BaseDialog<DialogComponent> extends BaseComponent{
  dialogRef : MatDialogRef<DialogComponent> = inject(MatDialogRef<DialogComponent>);
  readonly data = inject<{ message? : string , dialogData? :any, confirm? : boolean}>(MAT_DIALOG_DATA);
  closeDialog() {
    this.dialogRef.close(this.data);   
  }
}