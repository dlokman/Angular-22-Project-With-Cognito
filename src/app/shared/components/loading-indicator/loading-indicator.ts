import { Component, inject, signal } from '@angular/core';
import { LoadingIndicatorService } from './loading-indicator.service';

@Component({
  imports: [],
  selector: 'app-loading-indicator',
  styleUrl: './loading-indicator.css',
  templateUrl: './loading-indicator.html',
})
export class LoadingIndicator {
  isVisible = signal(false);
  loadingIndicator = inject(LoadingIndicatorService);

  constructor() {
    this.loadingIndicator.showPopup = () => this.isVisible.set(true);
    this.loadingIndicator.hidePopup = () => this.isVisible.set(false);
  }
}
