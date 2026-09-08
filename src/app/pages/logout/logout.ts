import { Component, inject } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  imports: [],
  selector: 'app-logout',
  styleUrl: './logout.css',
  templateUrl: './logout.html',
})
export class Logout {
  router = inject(Router)

  login(): void {
   this.router.navigate(['/']);
  }
}
