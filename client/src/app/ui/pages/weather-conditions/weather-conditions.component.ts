import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-weather-conditions',
  templateUrl: './weather-conditions.component.html',
  styleUrls: ['./weather-conditions.component.scss'],
})
export class WeatherConditionsComponent {
  citfySearhForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.citfySearh();
  }

  citfySearh() {
    this.citfySearhForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  search() {}
}
