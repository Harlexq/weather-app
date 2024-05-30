import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('header', { static: false }) header: ElementRef | null = null;
  @ViewChild('headerInner', { static: false }) headerInner: ElementRef | null =
    null;

  ngOnInit(): void {
    this.searchFormCreate();
  }

  constructor(
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private router: Router,
    private renderer: Renderer2
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

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdown = false;
    }
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.menu = false;
    }
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const currentScroll = window.pageYOffset;
    if (
      this.header &&
      this.headerInner &&
      this.header.nativeElement &&
      this.headerInner.nativeElement
    ) {
      if (currentScroll > 80) {
        this.renderer.setStyle(
          this.header.nativeElement,
          'backgroundColor',
          '#06131f'
        );
        this.renderer.setStyle(
          this.headerInner.nativeElement,
          'height',
          '80px'
        );
        this.renderer.setStyle(
          this.header.nativeElement,
          'borderBottom',
          '1px solid #ccc'
        );
        this.renderer.setStyle(
          this.header.nativeElement,
          'boxShadow',
          'rgba(149, 157, 165, 0.2) 0px 8px 24px;'
        );
      } else {
        this.renderer.setStyle(
          this.header.nativeElement,
          'backgroundColor',
          'transparent'
        );
        this.renderer.setStyle(
          this.headerInner.nativeElement,
          'height',
          '110px'
        );
        this.renderer.setStyle(this.header.nativeElement, 'border', 'none');
      }
    }
  }
}
