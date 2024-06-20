import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'weather-sidebar-form',
  templateUrl: './weather-sidebar-form.component.html',
  styleUrls: ['./weather-sidebar-form.component.scss'],
})
export class WeatherSidebarFormComponent {
  @Output() citySelected = new EventEmitter<string>();
  citySearchForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    window.addEventListener('cityUpdate', (event: any) => {
      const cityName = event.detail;
      this.Name.setValue(cityName);
      this.search();
    });
  }

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
      this.citySelected.emit(this.Name.value);
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
  }

  get Name(): FormControl {
    return this.citySearchForm.get('name') as FormControl;
  }
}
