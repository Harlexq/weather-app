import { Component, ElementRef, HostListener } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Navbar } from 'src/app/models/Navbar';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  dropdown: boolean = false;
  menu: boolean = false;
  searchForm!: FormGroup;
  isScrolled = false;
  user: User | null = null;

  ngOnInit(): void {
    this.searchFormCreate();
    this.getUsers();
  }

  constructor(
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private http: HttpClientService
  ) {}

  getUsers() {
    const userId = localStorage.getItem('userId');
    this.http.getById<User>('user', Number(userId), (res) => {
      this.user = res;
    });
  }

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

  logout() {
    this.authService.logout("login");
  }

  getToken(): boolean {
    return localStorage.getItem('token') ? false : true;
  }

  searchFormCreate() {
    this.searchForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  search() {
    this.router.navigate(['/weather-forecasts'], {
      queryParams: { city: this.Name.value },
    });
    this.menu = false;
  }

  clearInput() {
    this.Name.reset();
  }

  get Name(): FormControl {
    return this.searchForm.get('name') as FormControl;
  }

  mobileMenu() {
    this.menu = !this.menu;
  }

  userDropwon() {
    this.dropdown = !this.dropdown;
  }

  @HostListener('window:click', ['$event'])
  clickout(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdown = false;
    }
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.menu = false;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const currentScroll = window.pageYOffset;
    this.isScrolled = currentScroll > 80;
  }
}
