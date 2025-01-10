import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogParameters } from '../models/dialog/dialog-models';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
   dialog: MatDialog = inject(MatDialog);

  openDialog(dialogParameters: Partial<DialogParameters>): void {

    if(!dialogParameters.componentType)
      return;

    //dialog uygun parametrelerle açılır
    const dialogRef = this.dialog.open(dialogParameters.componentType, {
      width: dialogParameters.options?.width,
      height: dialogParameters.options?.height,
      position: dialogParameters.options?.position,
      data: dialogParameters.data,
    });

    dialogRef.afterClosed().subscribe(result => {
      // varsa bir afterclose metotu tetiklenir
      if (dialogParameters.afterClosedConfirm && result.confirm) {
        dialogParameters.afterClosedConfirm();
      }
      if (dialogParameters.afterClosed) {
        dialogParameters.afterClosed();
      }
    });    
  }
}
