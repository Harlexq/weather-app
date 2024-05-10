import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, callBack: (data: T) => void) {
    this.http.get<T>(this.apiUrl + endpoint).subscribe({
      next: (res) => callBack(res),
    });
  }

  getById<T>(endpoint: string, id: number, callBack: (data: T) => void) {
    this.http.get<T>(`${this.apiUrl + endpoint}/${id}`).subscribe({
      next: (res) => callBack(res),
    });
  }

  post<T>(endpoint: string, data: T, callBack: (data: T) => void) {
    this.http.post<T>(this.apiUrl + endpoint, data).subscribe({
      next: (res) => callBack(res),
    });
  }

  put<T>(endpoint: string, id: number, data: T, callBack: (data: T) => void) {
    this.http.put<T>(`${this.apiUrl + endpoint}/${id}`, data).subscribe({
      next: (res) => callBack(res),
    });
  }

  delete<T>(endpoint: string, id: number, callBack: (data: T) => void) {
    this.http.delete<T>(`${this.apiUrl + endpoint}/${id}`).subscribe({
      next: (res) => callBack(res),
    });
  }
}
