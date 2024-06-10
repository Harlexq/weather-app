import { Component, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Navbar } from 'src/app/models/Navbar';

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

  ngOnInit(): void {
    this.searchFormCreate();
  }

  constructor(
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

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
      id: 4,
      title: 'Harita',
      path: '/map',
    },
    {
      id: 3,
      title: 'Hakkımızda',
      path: '/about',
    },
    {
      id: 3,
      title: 'Bloglar',
      path: '/blogs',
    },
    {
      id: 5,
      title: 'Geri Bildirim',
      path: '/feedback',
    },
  ];

  getToken(): boolean {
    return localStorage.getItem('token') ? false : true;
  }

  searchFormCreate() {
    this.searchForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  search() {
    this.router.navigateByUrl('weather-conditions');
    this.menu = false;
  }

  clearInput() {
    this.searchForm.get('name')?.reset();
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
