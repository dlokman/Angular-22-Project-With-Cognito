import { Component, signal, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth-service/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, RouterLink, RouterLinkActive, NgOptimizedImage, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
  private readonly authService = inject(AuthService);
  readonly userData = this.authService.userData;

  isMobileMenuOpen = signal(false);
  faCircleUser = faCircleUser;

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(isOpen => !isOpen);
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
}
