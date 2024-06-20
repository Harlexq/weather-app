import { Component } from '@angular/core';
import { Navbar } from 'src/app/models/Navbar';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  navItems: Navbar[] = [
    {
      id: 1,
      title: 'Anasayfa',
      path: '/',
      icon: 'fa-solid fa-house',
    },
    {
      id: 2,
      title: 'Yorumlar',
      path: '/comments',
      icon: 'fa-solid fa-comments',
    },
    {
      id: 3,
      title: 'Şehirler',
      path: '/citys',
      icon: 'fa-solid fa-city',
    },
    {
      id: 4,
      title: 'Kullanıcılar',
      path: '/users',
      icon: 'fa-solid fa-users',
    },
    {
      id: 5,
      title: 'Bloglar',
      path: '/blogs',
      icon: 'fa-regular fa-newspaper',
    },
  ];
}
