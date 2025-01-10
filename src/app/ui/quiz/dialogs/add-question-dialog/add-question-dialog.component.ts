import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { BaseDialog } from '../../../../common/dialogs/base-dialog';
import { MatRadioModule } from '@angular/material/radio'; // Radio butonlar
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Quiz } from '../../../../models/quiz/quiz';

export interface Question {
  questionText: string;
  answers: Answer[];
}
export interface Answer {
  text: string;
  isCorrect: boolean;
}

@Component({
  selector: 'app-add-question-dialog',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatRadioModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.scss']
})
export class AddQuestionDialogComponent extends BaseDialog<AddQuestionDialogComponent> {

  quiz: Quiz = { id: '', title: '', description: '' };
  questionText: string = ''; // Soru metni
  answers: Answer[] = []; // Cevaplar dizisi
  correctAnswer: number | null = -1; // Doğru cevabın indexi


  ngOnInit(): void {
    this.quiz = this.data.dialogData;
    // Varsayılan bir cevap dizisi ekle
    this.answers = Array(1).fill(null).map(() => ({ text: '', isCorrect: false }));
  }

  // Yeni cevap ekleme
  addAnswer() {
    this.answers.push({ text: '', isCorrect: false });
  }

  // Soru ekleme
  async addQuestion() {
    if (!this.questionText.trim() || this.correctAnswer === null || this.correctAnswer >= this.answers.length) {
      debugger;
      return;
    }
  
    debugger
    // Doğru cevabı belirle
    this.answers.forEach((answer, index) => {
      answer.isCorrect = index === this.correctAnswer;
    });

    const question: Question = {
      questionText: this.questionText,
      answers: this.answers
    };

    const obsData = await this.httpService.post({
      controller : "Questions",
      action : "add-question"
    },{ question: question,quizId : this.quiz.id});
     await this.handleRequest(obsData);

   
    console.log('Added Question:', question); // Soru ekleme işlemini logla
    
    // Varsayılanları temizle
    this.questionText = '';
    this.answers = Array(4).fill(null).map(() => ({ text: '', isCorrect: false }));
    this.correctAnswer = null;
  }

  // Cevap kaldırma
  removeAnswer(index: number) {
    if (index >= 0 && index < this.answers.length) {
      this.answers.splice(index, 1);
      // Eğer kaldırılan cevap doğru cevapsa, doğru cevap indexini sıfırla
      if (this.correctAnswer === index) {
        this.correctAnswer = null;
      } else if (this.correctAnswer !== null && this.correctAnswer > index) {
        this.correctAnswer--;
      }
    }
  }

 

}
