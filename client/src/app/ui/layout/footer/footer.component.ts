import { Component } from '@angular/core';
import { Navbar } from 'src/app/models/Navbar';

@Component({
  selector: 'ui-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  navItems: Navbar[] = [
    {
      id: 1,
      title: 'Anasayfa',
      path: '/',
    },
    {
      id: 2,
      title: 'Hava Tahminleri',
      path: '/weather-forecasts',
    },
    {
      id: 4,
      title: 'Harita',
      path: '/map',
    },
    {
      id: 6,
      title: 'Hakkımızda',
      path: '/about',
    },
    {
      id: 7,
      title: 'Bloglar',
      path: '/blogs',
    },
    {
      id: 8,
      title: 'Geri Bildirim',
      path: '/feedback',
    },
  ];
}
