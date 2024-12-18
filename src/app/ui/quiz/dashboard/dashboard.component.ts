import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Injector, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {ChangeDetectionStrategy} from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CreateQuizDialogComponent } from '../dialogs/create-quiz-dialog/create-quiz-dialog.component';
import { BaseComponent } from '../../../common/base-component';
import { BaseResponse } from '../../../models/base/base-response';
import { FormsModule } from '@angular/forms';
import { DeleteDirective } from '../../../directives/delete.directive';


interface Quiz {
  id:string;
  title: string;
  description: string;
}

interface QuizRequest {
  page: number;
  size: number;
  query?: string; // Optional olarak işaretlendi
}

interface QuizResponse extends BaseResponse {
  totalCount: number;
  quizzes: Quiz[]; // List yerine Quiz[] kullanıldı
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    DeleteDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DashboardComponent extends BaseComponent implements OnInit {

  readonly dialog = inject(MatDialog);

  filteredQuizzes: Quiz[] = [];
  pageSize: number = 3;
  startIndex: number = 0;
  endIndex: number = this.pageSize;

  totalQuizzesCount: number = 0; 
  currentPage: number = 1; 
  searchQuery: string = '';

  async ngOnInit() {
    await this.fetchQuizzes();
  }
  editQuiz(quizId: string) {
    console.log('Düzenlenecek Quiz ID:', quizId);
  }

  createQuiz() {
    this.dialog.open(CreateQuizDialogComponent);
  }


  //list işlemleri -----
  async handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1; // Angular'da pageIndex 0'dan başlar
    this.pageSize = event.pageSize;
    await this.fetchQuizzes();
  }
  onSearch(event: Event) {
    console.log("Input value:", this.searchQuery); // Arama değerini konsola yazdır
    this.currentPage = 1; // Yeni arama başladığında ilk sayfaya dön
    this.fetchQuizzes(); // Yeni veri çek
  }
  // Yeni veri çekme fonksiyonu
  async fetchQuizzes(){
    this.spinner.show();
    try {
      await this.getQuizzes(this.currentPage, this.pageSize, this.searchQuery);
    } catch (error) {
      
    }finally{
      this.spinner.hide();
    }    
  }
  async getQuizzes(page: number = 1, size: number = 3, query?: string): Promise<void> {
    // Query string oluşturuluyor
    let _queryString = `page=${page}&size=${size}`;
    if (query && query.trim()) {
      _queryString += `&query=${encodeURIComponent(query)}`;
    }
  
    // HTTP isteği Observable olarak çağrılıyor
    await this.httpService.get<QuizResponse>({
      controller: 'quizzes',
      action: 'get-quizzes',
      queryString: _queryString,
    }).subscribe({
      next: (response) => {

        this.totalQuizzesCount = response.totalCount;
        this.filteredQuizzes = response.quizzes;
        
      },
      error: (error) => {
        console.error('Error fetching quizzes:', error);
        this.tostr.showError("Quizler yüklenemedi bir hata ile karşılaşıldı");
      },
    });
  }
}
