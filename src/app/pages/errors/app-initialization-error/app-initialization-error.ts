import { Component } from '@angular/core';
import { faLock} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-app-initialization-error',
  styleUrl: './app-initialization-error.css',
  templateUrl: './app-initialization-error.html',
})
export class AppInitializationError {
  faLock = faLock;
}
