import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, RouterLink, RouterLinkActive, NgOptimizedImage, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
  isMobileMenuOpen = signal(false);

  faCircleUser = faCircleUser;

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(isOpen => !isOpen);
  }
}
