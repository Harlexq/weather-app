import { Component, HostListener } from '@angular/core';
import { AdminUser } from 'src/app/models/AdminUser';
import { Navbar } from 'src/app/models/Navbar';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isFullscreen: boolean = false;
  sidebar: boolean = false;
  dropdown: boolean = false;
  user: AdminUser | null = null;

  constructor(
    private authService: AuthService,
    private http: HttpClientService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!event.target) return;
    const clickedInside = this.isClickedInside(event.target as Element);
    if (!clickedInside) {
      this.dropdown = false;
    }
  }

  getUsers() {
    const userId = localStorage.getItem('adminId');
    this.http.getById<AdminUser>('adminUser', Number(userId), (res) => {
      this.user = res;
    });
  }

  isClickedInside(target: Element): boolean {
    return (
      target.closest('.dropdown') !== null ||
      target.closest('.user-btn') !== null
    );
  }

  @HostListener('document:fullscreenchange', [])
  onFullscreenChange() {
    this.isFullscreen = !!document.fullscreenElement;
  }

  toggleFullscreen() {
    if (!this.isFullscreen) {
      this.openFullscreen();
    } else {
      this.closeFullscreen();
    }
  }

  openFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }

  closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }

  toggleSidebar() {
    this.sidebar = !this.sidebar;
  }

  logout() {
    this.authService.logout("admin");
  }

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
