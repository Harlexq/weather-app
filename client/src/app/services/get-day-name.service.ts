import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetDayNameService {
  constructor() {}

  getDayName(dateString: string): string {
    const date = new Date(dateString);
    const days = [
      'Pazar',
      'Pazartesi',
      'Salı',
      'Çarşamba',
      'Perşembe',
      'Cuma',
      'Cumartesi',
    ];
    return days[date.getDay()];
  }
}
