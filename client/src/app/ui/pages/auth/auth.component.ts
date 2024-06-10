import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  signInForm!: FormGroup;
  signUpForm!: FormGroup;
  @ViewChild('auth') authElement: ElementRef | null = null;

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private authService: AuthService,
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

  signIn() {
    this.authService.login(this.signUpForm.value, (res) => {});
  }

  signUp() {
    this.authService.signup(this.signUpForm.value, (res) => {});
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
