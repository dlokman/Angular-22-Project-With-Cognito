import { Component } from '@angular/core';
import { faLock} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-not-authorized',
  styleUrl: './not-authorized.css',
  templateUrl: './not-authorized.html',
})
export class NotAuthorized {
  faLock = faLock;
}
