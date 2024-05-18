import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
  feedbackForm!: FormGroup;
  selectedRating: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.feedbackFormCreate();
  }

  feedbackFormCreate() {
    this.feedbackForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      rating: ['', Validators.required],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(100),
          Validators.maxLength(600),
        ],
      ],
    });
  }

  send() {
    if (this.feedbackForm.valid) {
    }
  }

  setRating(rating: number) {
    this.selectedRating = rating;
    this.feedbackForm.get('rating')!.setValue(rating);
  }

  get FirstName(): FormControl {
    return this.feedbackForm.get('firstName') as FormControl;
  }

  get LastName(): FormControl {
    return this.feedbackForm.get('lastName') as FormControl;
  }

  get Email(): FormControl {
    return this.feedbackForm.get('email') as FormControl;
  }

  get Phone(): FormControl {
    return this.feedbackForm.get('phone') as FormControl;
  }

  get Rating(): FormControl {
    return this.feedbackForm.get('rating') as FormControl;
  }

  get Message(): FormControl {
    return this.feedbackForm.get('message') as FormControl;
  }
}
