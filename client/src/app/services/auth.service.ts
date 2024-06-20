import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.weatherAppApiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(endpoint: string, data: any, callBack: (data: any) => void) {
    this.http.post<any>(this.apiUrl + endpoint, data).subscribe({
      next: (res) => {
        callBack(res);
        if (endpoint === 'login') {
          this.router.navigateByUrl('/');
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.id);
        } else {
          this.router.navigateByUrl('/admin');
          localStorage.setItem('adminToken', res.token);
          localStorage.setItem('adminId', res.id);
        }
      },
    });
  }

  checkIsAuth(tokenName: string): boolean {
    const token = localStorage.getItem(tokenName);
    if (token) return true;

    tokenName === 'adminToken'
      ? this.router.navigateByUrl('/admin/auth')
      : this.router.navigateByUrl('/auth');

    return false;
  }

  logout(endpoint: string) {
    if (endpoint === 'login') {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.router.navigateByUrl('/auth');
    } else {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminId');
      this.router.navigateByUrl('/admin/auth');
    }
  }

  signup(endpoint: string, data: any, callBack: (data: any) => void) {
    this.http.post<any>(this.apiUrl + endpoint, data).subscribe({
      next: (res) => {
        callBack(res);
        if (endpoint === 'signup') {
          this.router.navigateByUrl('/');
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.id);
        } else {
          this.router.navigateByUrl('/admin');
          localStorage.setItem('adminToken', res.token);
          localStorage.setItem('adminId', res.id);
        }
      },
    });
  }
}
