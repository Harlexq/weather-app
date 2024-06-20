import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'weather-trends-form',
  templateUrl: './weather-trends-form.component.html',
  styleUrls: ['./weather-trends-form.component.scss'],
})
export class WeatherTrendsFormComponent {
  citySearchForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.route.queryParams.subscribe((params) => {
      const city = params['city'];
      if (city) {
        this.Name.setValue(city);
      }
    });
  }

  createForm() {
    this.citySearchForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  search() {
    if (this.citySearchForm.valid) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { city: this.Name.value },
        queryParamsHandling: 'merge',
      });
    } else {
      this.clearWeatherData();
    }
  }

  onNameChange(value: string): void {
    if (value === '') {
      this.routeDefault();
    }
  }

  clearInput() {
    this.citySearchForm.reset();
    this.routeDefault();
  }

  routeDefault() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { city: null },
      queryParamsHandling: 'merge',
    });
    this.clearWeatherData();
  }

  clearWeatherData() {}

  get Name(): FormControl {
    return this.citySearchForm.get('name') as FormControl;
  }
}
