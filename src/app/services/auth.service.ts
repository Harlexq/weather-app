import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(
    data: { email: string; password: string },
    callBack: (data: { email: string; password: string }) => void
  ) {
    this.http.post<User>(this.apiUrl + 'login', data).subscribe({
      next: (res) => {
        callBack(res);
        localStorage.setItem('token', res.token);
      },
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  signup(data: User, callBack: (data: User) => void) {
    this.http.post<User>(this.apiUrl + 'signup', data).subscribe({
      next: (res) => {
        callBack(res);
        this.router.navigateByUrl('/login');
      },
    });
  }
}
