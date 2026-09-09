import { Component, inject } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  imports: [],
  selector: 'app-error',
  styleUrl: './error.css',
  templateUrl: './error.html',
})
export class Error {
  router = inject(Router)

  goHome() {
    this.router.navigate(['/chat-1']);
  }
}
