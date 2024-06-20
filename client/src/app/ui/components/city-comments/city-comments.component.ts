import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/User';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'city-comments',
  templateUrl: './city-comments.component.html',
  styleUrls: ['./city-comments.component.scss'],
})
export class CityCommentsComponent {
  commentForm!: FormGroup;
  logged: boolean = false;
  user: User | null = null;
  cityName: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClientService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cityName = params['city'];
    });
    this.userLogged();
    this.commentFormCreate();
    this.getUser();
  }

  commentFormCreate() {
    this.commentForm = this.formBuilder.group({
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(600),
        ],
      ],
    });
  }

  getUser() {
    const userId = localStorage.getItem('userId');
    this.http.getById<User>('user', Number(userId), (res) => {
      this.user = res;
    });
  }

  userLogged(): boolean {
    const user = localStorage.getItem('token');
    if (user) {
      this.logged = true;
      return this.logged;
    } else {
      this.logged = false;
      return this.logged;
    }
  }

  comment() {
    const personId = localStorage.getItem('userId');

    const commentData = {
      ...this.commentForm.value,
      personId,
      city: this.cityName,
    };

    this.http.post<Comment>('commentCreate', commentData, (res) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail:
          'Yorum Başarıyla Gönderilmiştir 3 Saniye İçinde Sayfa Yenilenecektir',
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  }

  get Message(): FormControl {
    return this.commentForm.get('message') as FormControl;
  }
}
