import { Component } from '@angular/core';
import { Comment } from 'src/app/models/Comment';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'home-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  comments: Comment[] = [];
  totalCommentCount: number = 0;
  newCommentCountDay: number = 0;
  newCommentCountWeek: number = 0;
  newCommentCountMonth: number = 0;
  data: any;

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    this.http.get<Comment[]>(`comments`, (res) => {
      this.comments = res;
      this.totalCommentCount = this.comments.length;
      this.calculateNewComments();
      this.chartComments();
    });
  }

  calculateNewComments() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    this.newCommentCountDay = this.comments.filter(
      (comment) => new Date(comment.publicationDate) >= today
    ).length;
    this.newCommentCountWeek = this.comments.filter(
      (comment) => new Date(comment.publicationDate) >= oneWeekAgo
    ).length;
    this.newCommentCountMonth = this.comments.filter(
      (comment) => new Date(comment.publicationDate) >= oneMonthAgo
    ).length;
  }

  chartComments() {
    this.data = {
      labels: [
        'Toplam Yorumlar',
        'Bugün Eklenenler',
        'Son Bir Haftada Eklenenler',
        'Son Bir Ayda Eklenenler',
      ],
      datasets: [
        {
          label: 'Yorum Sayısı',
          data: [
            this.totalCommentCount,
            this.newCommentCountDay,
            this.newCommentCountWeek,
            this.newCommentCountMonth,
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgb(75, 192, 192)',
            'rgb(255, 159, 64)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }
}
