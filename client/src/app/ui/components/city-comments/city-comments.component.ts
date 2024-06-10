import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'city-comments',
  templateUrl: './city-comments.component.html',
  styleUrls: ['./city-comments.component.scss'],
})
export class CityCommentsComponent {
  commentForm!: FormGroup;
  logged: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClientService
  ) {}

  ngOnInit(): void {
    this.user();
    this.commentFormCreate();
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

  user(): boolean {
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
    this.http.post('comments', this.commentForm.value, (res) => {
      console.log(res);
    });
  }

  get Message(): FormControl {
    return this.commentForm.get('message') as FormControl;
  }
}
