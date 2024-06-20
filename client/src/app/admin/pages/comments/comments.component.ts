import { Component } from '@angular/core';
import { Comment } from 'src/app/models/Comment';
import { User } from 'src/app/models/User';
import { HttpClientService } from 'src/app/services/http-client.service';
import { CustomDialogService } from 'src/app/services/primeng/cutom-dialog.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  comments: Comment[] = [];
  userSharedVisible: boolean = false;
  selectedUserId: number | null = null;
  users: User[] = [];

  constructor(
    private http: HttpClientService,
    private customDialogService: CustomDialogService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getComments();
  }

  formatPublicationDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  getUsers() {
    this.http.get<User[]>('users', (res) => {
      this.users = res;
    });
  }

  getComments() {
    this.http.get<Comment[]>('comments', (res) => {
      this.comments = res;
    });
  }

  getUserNameById(personId: number): string {
    const user = this.users.find((user) => user.id === personId);
    return user ? user.name : 'Bilinmiyor';
  }

  commentDelete(userId: number) {
    this.customDialogService.delete('Yorumu', 'Yorum', 'comment', userId);
  }
}
