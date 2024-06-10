import { Component } from '@angular/core';
import { GeocodingService } from 'src/app/services/geocoding.service';

@Component({
  selector: 'empty-city',
  templateUrl: './empty-city.component.html',
  styleUrls: ['./empty-city.component.scss'],
})
export class EmptyCityComponent {
  constructor(private geocodingService: GeocodingService) {}

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
    } else {
      alert('Coğrafi konum bu tarayıcı tarafından desteklenmiyor.');
    }
  }

  showPosition(position: GeolocationPosition) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    this.getCityName(lat, lon);
  }

  getCityName(lat: number, lon: number) {
    this.geocodingService.getCityName(lat, lon).subscribe(
      (res) => {
        this.updateCityInput(res);
      },
      (err) => {
        console.log('Şehir adı getirilirken hata oluştu:', err);
      }
    );
  }

  updateCityInput(city: string) {
    const event = new CustomEvent('cityUpdate', { detail: city });
    window.dispatchEvent(event);
  }
}
