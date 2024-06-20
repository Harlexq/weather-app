import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/Comment';
import { User } from 'src/app/models/User';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.scss'],
})
export class ListCommentsComponent {
  comments: Comment[] = [];
  users: User[] = [];
  cityName: string = '';
  user: User | undefined = undefined;

  constructor(private http: HttpClientService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cityName = params['city'];
      this.getComments();
    });
    this.getUsers();
  }

  getUsers() {
    this.http.get<User[]>(`users`, (res) => {
      this.users = res;
      this.matchUsersToComments();
    });
  }

  getComments() {
    this.http.get<Comment[]>(`comments/city/${this.cityName}`, (res) => {
      this.comments = res;
      this.matchUsersToComments();
    });
  }

  matchUsersToComments() {
    this.comments.forEach((comment) => {
      this.user = this.users.find((user) => user.id === comment.personId);
    });
  }
}
