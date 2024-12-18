import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseComponent } from '../../../../common/base-component';
import { firstValueFrom } from 'rxjs';
import { BaseResponse } from '../../../../models/base/base-response';

@Component({
  selector: 'app-create-quiz-dialog',
  standalone: true,
  imports: [

    CommonModule,
    ReactiveFormsModule,
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatDialogClose, 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './create-quiz-dialog.component.html',
  styleUrl: './create-quiz-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateQuizDialogComponent extends BaseComponent {
    form: FormGroup;
    fb: FormBuilder = inject(FormBuilder);

  constructor(
    private dialogRef: MatDialogRef<CreateQuizDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  async createQuiz() { 

    let resquest : {title : String, description : string } = this.form.value;

    const obsData = this.httpService.post({
      controller :"Quizzes",
      action : "create-quiz"
    },resquest) as any;
    
    this.spinner.show();
 
    let data : BaseResponse = { succeed : false, responseMessage :"Quiz oluşturulamadı"};

    try {
       data  =  await firstValueFrom(obsData) as BaseResponse;
    } catch (error) {
    }finally{
      this.spinner.hide();
    }

    if(data?.succeed){
      this.tostr.showSuccess(data.responseMessage);
    }else{
      this.tostr.showError(data.responseMessage);
    }

    this.dialogRef.close();

  }

}