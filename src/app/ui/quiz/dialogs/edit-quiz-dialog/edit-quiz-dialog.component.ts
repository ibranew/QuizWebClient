import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { BaseDialog } from '../../../../common/dialogs/base-dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Quiz} from '../../../../models/quiz/quiz';
import { firstValueFrom } from 'rxjs';
import { BaseResponse } from '../../../../models/base/base-response';

@Component({
  selector: 'app-edit-quiz-dialog',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent],
  templateUrl: './edit-quiz-dialog.component.html',
  styleUrl: './edit-quiz-dialog.component.scss'
})
export class EditQuizDialogComponent extends BaseDialog<EditQuizDialogComponent> implements OnInit{

  quiz : Quiz = {id: "", title  :"" ,description : ""}
  id : string = "";
  title: string = 'Sample Quiz Title'; // Varsayılan değer
  description: string = 'Sample Quiz Description'; // Varsayılan değer

  ngOnInit(): void {
    this.quiz = this.data.dialogData;
  }

  async saveQuiz(){

    const obsData = this.httpService.put({
     controller : "quizzes"
    },{ Quiz : this.quiz} as any)

    await this.handleRequest<any>(obsData,{
      errorMessage  : "Quiz düzenlenmesi kaydedilemedi",
      successMessage : "Quiz düzenlenmesi kaydedildi",
    })

  }

}
