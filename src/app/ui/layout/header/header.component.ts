import { Component } from '@angular/core';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  navItems = [
    {
      title: 'Anasayfa',
      path: '/',
    },
    {
      title: 'Hakkımızda',
      path: '/about',
    },
    {
      title: 'İletişim',
      path: '/contact',
    },
    {
      title: 'Geri Bildirim',
      path: '/feedback',
    },
  ];
}
