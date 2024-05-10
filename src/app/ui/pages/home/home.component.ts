import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.http
      .get(
        `${environment.apiUrl}q=gaziantep&appid=${environment.apiKey}&units=metric&lang=tr`
      )
      .subscribe({
        next: (res) => console.log(res),
      });
  }
}
