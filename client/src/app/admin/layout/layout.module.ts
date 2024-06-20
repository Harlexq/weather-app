import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [AdminLayoutComponent, HeaderComponent, SidebarComponent],
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
})
export class LayoutModule {}
