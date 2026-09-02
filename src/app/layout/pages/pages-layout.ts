import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { LoadingIndicator } from '../../shared/components/loading-indicator/loading-indicator';

@Component({
  imports: [RouterOutlet, NavbarComponent, LoadingIndicator],
  selector: 'app-pages-layout',
  styleUrl: './pages-layout.css',
  templateUrl: './pages-layout.html',
})
export class PagesLayout {}
