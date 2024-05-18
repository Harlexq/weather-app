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
      title: 'Hava Durumları',
      path: '/weather-conditions',
    },
    {
      id: 3,
      title: 'Hakkımızda',
      path: '/about',
    },
    {
      id: 4,
      title: 'Geri Bildirim',
      path: '/feedback',
    },
  ];
}
