import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientService } from 'src/app/services/http-client.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  signInForm!: FormGroup;
  signUpForm!: FormGroup;
  @ViewChild('auth') authElement: ElementRef | null = null;
  users: User[] = [];
  errorMessage: string = '';
  signInErrorMessage: string = '';

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private http: HttpClientService
  ) {}

  signUpMode() {
    if (this.authElement) {
      this.renderer.addClass(this.authElement.nativeElement, 'sign-up-mode');
    }
  }

  loginMode() {
    if (this.authElement) {
      this.renderer.removeClass(this.authElement.nativeElement, 'sign-up-mode');
    }
  }

  ngOnInit(): void {
    this.getUsers();
    this.signInFormCreate();
    this.signUpFormCreate();
  }

  signInFormCreate() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signUpFormCreate() {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      ],
    });
  }

  getUsers() {
    this.http.get<User[]>('users', (res) => {
      this.users = res;
    });
  }

  signIn() {
    this.users.find((user) => {
      if (user.email === this.signInEmail.value) {
        this.authService.login('login', this.signInForm.value, (res) => {});
      } else {
        this.signInErrorMessage = 'E-Mail Adresi veya Şifre Yanlış';
      }
    });
  }

  signUp() {
    const userExists = this.users.find(
      (user) => user.email === this.signUpEmail.value
    );

    if (userExists) {
      this.errorMessage = 'Bu E-Mail Adresi Zaten Kayıtlı';
    } else {
      this.authService.signup('signup', this.signUpForm.value, (res) => {
        this.errorMessage = '';
      });
    }
  }

  get signInEmail(): FormControl {
    return this.signInForm.get('email') as FormControl;
  }

  get signInPassword(): FormControl {
    return this.signInForm.get('password') as FormControl;
  }

  get signUpName(): FormControl {
    return this.signUpForm.get('name') as FormControl;
  }

  get signUpEmail(): FormControl {
    return this.signUpForm.get('email') as FormControl;
  }

  get signUpPassword(): FormControl {
    return this.signUpForm.get('password') as FormControl;
  }
}
