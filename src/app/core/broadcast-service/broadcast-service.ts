import { Service } from '@angular/core';
import { Subject } from 'rxjs';

@Service()
export class BroadcastService {
  gridUpdated = new Subject<void>();
}
